/* @flow weak */
import generateStyleHash from './utils/generateStyleHash'
import getFontFormat from './utils/getFontFormat'

import processStyle from './utils/processStyle'
import diffStyle from './utils/diffStyle'

import cssifyKeyframe from './utils/cssifyKeyframe'
import cssifyObject from './utils/cssifyObject'

import warning from './utils/warning'

/**
 * creates a new renderer instance
 *
 * @param {Object} config - renderer configuration
 * @return {Object} new renderer instance
 */
export default function createRenderer(config = { }) {
  // the renderer is the key
  let renderer = {
    listeners: [],
    keyframePrefixes: config.keyframePrefixes || [ '-webkit-', '-moz-' ],
    plugins: config.plugins || [ ],

    // try and use readable selectors when
    // prettySelectors is on and not in a prod environment
    prettySelectors: config.prettySelectors && process.env.NODE_ENV !== 'production',
    mediaQueryOrder: config.mediaQueryOrder || [ ],

    /**
     * clears the sheet's cache but keeps all listeners
     */
    clear() {
      renderer.fontFaces = ''
      renderer.keyframes = ''
      renderer.statics = ''
      renderer.rules = ''
      renderer.mediaRules = renderer.mediaQueryOrder.reduce((rules, media) => {
        rules[media] = ''
        return rules
      }, { })

      renderer.rendered = { }
      renderer.base = [ ]
      renderer.ids = [ ]
      renderer.baseClassName = [ ]
      renderer.callStack = [ ]

      // emit changes to notify subscribers
      renderer._emitChange({ type: 'clear' })
    },

    /**
     * renders a new rule variation and caches the result
     *
     * @param {Function} rule - rule which gets rendered
     * @param {Object?} props - properties used to render
     * @param {Object?} defaultProps - properties used to render the static style
     * @return {string} className to reference the rendered rule
     */
    renderRule(rule, props = { }, defaultProps = { }) {
      // rendering a rule for the first time
      // will create an ID reference
      if (renderer.ids.indexOf(rule) === -1) {
        renderer.ids.push(rule)

        // directly render the static base style to be able
        // to diff future dynamic style with those
        try {
          renderer.renderRule(rule, defaultProps, defaultProps)
        } catch (error) {
          warning(false, `Nested props have been used without passing 'defaultProps'. This will disable static style splitting for '${rule.name ? rule.name : 'unkown_rule'}'.`)
        }
      }

      const ruleId = renderer.ids.indexOf(rule)

      const ruleProps = {
        ...defaultProps,
        ...props
      }

      const style = rule(ruleProps)
      const styleId = renderer._generateStyleId(style)

      let className = 'c' + styleId

      // extend the className with prefixes in development
      // this enables better debugging and className readability
      if (process.env.NODE_ENV !== 'production') {
        className = (renderer._selectorPrefix ? (renderer._selectorPrefix + '__') : '') + ((renderer.prettySelectors && rule.name) ? rule.name + '__' : '') + className
      }

      // only if the rule has not already been rendered
      // with a specific set of properties it actually renders
      if (!renderer.rendered.hasOwnProperty(className)) {
        // process style using each plugin
        const processedStyle = processStyle(style, {
          type: 'rule',
          className: className,
          props: ruleProps,
          rule: rule
        }, renderer.plugins)


        // diff style objects with base styles
        const diffedStyle = diffStyle(processedStyle, renderer.base[ruleId])
        renderer.rendered[className] = false

        if (Object.keys(diffedStyle).length > 0) {
          renderer._renderStyle(className, diffedStyle)
        }

        renderer.callStack.push(renderer.renderRule.bind(renderer, rule, props, defaultProps))

        // keep static style to diff dynamic onces later on
        if (props === defaultProps) {
          renderer.base[ruleId] = diffedStyle
          renderer.baseClassName[ruleId] = className
          return renderer.rendered[className] ? className : ''
        }
      }

      const baseClassName = renderer.baseClassName[ruleId]

      // if current className is empty
      // return either the static class or empty string
      if (!renderer.rendered[className]) {
        return renderer.rendered[baseClassName] ? baseClassName : ''
      }

      // if the current className is a dynamic rule
      // return both classNames if static subset is not empty
      if (className !== baseClassName) {
        return (renderer.rendered[baseClassName] ? baseClassName + ' ' : '') + className
      }

      return className
    },

    /**
     * renders a new keyframe variation and caches the result
     *
     * @param {Keyframe} keyframe - Keyframe which gets rendered
     * @param {Object?} props - properties used to render
     * @return {string} animationName to reference the rendered keyframe
     */
    renderKeyframe(keyframe, props = { }) {
      const style = keyframe(props)
      const styleId = renderer._generateStyleId(style)

      let animationName = 'k' + styleId

      // extend the animationName with prefixes in development
      // this enables better debugging and className readability
      if (process.env.NODE_ENV !== 'production') {
        animationName = ((renderer.prettySelectors && keyframe.name) ? keyframe.name + '__' : '') + animationName
      }

      // only if the keyframe has not already been rendered
      // with a specific set of properties it actually renders
      if (!renderer.rendered.hasOwnProperty(animationName)) {
        const processedKeyframe = processStyle(style, {
          type: 'keyframe',
          keyframe: keyframe,
          props: props,
          animationName: animationName
        }, renderer.plugins)

        const css = cssifyKeyframe(processedKeyframe, animationName, renderer.keyframePrefixes)
        renderer.rendered[animationName] = true
        renderer.keyframes += css

        renderer.callStack.push(renderer.renderKeyframe.bind(renderer, keyframe, props))
        renderer._emitChange({
          name: animationName,
          style: processedKeyframe,
          css: css,
          type: 'keyframe'
        })
      }

      return animationName
    },

    /**
     * renders a new font-face and caches it
     *
     * @param {FontFace} fontFace - fontFace which gets rendered
     * @return {string} fontFamily reference
     */
    renderFont(family, files, properties = { }) {
      const key = family + generateStyleHash(properties)

      if (!renderer.rendered.hasOwnProperty(key)) {
        const fontFace = {
          fontFamily: '\'' + family + '\'',
          src: files.map(src => 'url(\'' + src + '\') format(\'' + getFontFormat(src) + '\')').join(',')
        }

        const fontProperties = [ 'fontVariant', 'fontWeight', 'fontStretch', 'fontStyle', 'unicodeRange' ]
        Object.keys(properties).filter(prop => fontProperties.indexOf(prop) > -1).forEach(fontProp => fontFace[fontProp] = properties[fontProp])

        const css = '@font-face{' + cssifyObject(fontFace) + '}'

        renderer.rendered[key] = true
        renderer.fontFaces += css

        renderer.callStack.push(renderer.renderFont.bind(renderer, family, files, properties))

        renderer._emitChange({
          fontFamily: family,
          fontFace: fontFace,
          css: css,
          type: 'font'
        })
      }

      return family
    },

    /**
     * renders static style and caches them
     *
     * @param {string|Object} style - static style to be rendered
     * @param {string?} selector - selector used to render the styles
     * @return {string} rendered CSS output
     */
    renderStatic(style, selector) {
      const reference = typeof style === 'string' ? style : selector + JSON.stringify(style)

      if (!renderer.rendered.hasOwnProperty(reference)) {
        if (typeof style === 'string') {
          const css = style.replace(/\s{2,}/g, '')
          // remove new lines from template strings
          renderer.statics += css
          renderer._emitChange({
            selector: selector,
            type: 'static',
            css: css
          })
        } else {
          const processedStyle = processStyle(style, {
            selector: selector,
            type: 'static'
          }, renderer.plugins)

          const css = cssifyObject(processedStyle)
          renderer.statics += selector + '{' + css + '}'

          renderer.callStack.push(renderer.renderStatic.bind(renderer, style, selector))

          renderer._emitChange({
            selector: selector,
            style: processedStyle,
            css: css,
            type: 'rule'
          })
        }

        renderer.rendered[reference] = true
      }
    },

    /**
     * renders all cached styles into a single valid CSS string
     * clusters media query styles into groups to reduce output size

     * @return single concatenated CSS string
     */
    renderToString() {
      let css = renderer.fontFaces + renderer.statics + renderer.rules

      for (let media in renderer.mediaRules) {
        const rules = renderer.mediaRules[media]
        if (rules.length > 0) {
          css += '@media ' + media + '{' + rules + '}'
        }
      }

      return css + renderer.keyframes
    },

    /**
     * Adds a new subscription to get notified on every rerender
     *
     * @param {Function} callback - callback function which will be executed
     * @return {Object} equivalent unsubscribe method
     */
    subscribe(callback) {
      renderer.listeners.push(callback)
      return {
        unsubscribe: () => renderer.listeners.splice(renderer.listeners.indexOf(callback), 1)
      }
    },

    /**
     * rehydrates the whole cache using the callStack
     */
    rehydrate() {
      const callStack = renderer.callStack.slice(0)

      // clears the current callStack
      renderer.clear()

      renderer._emitChange({ type: 'rehydrate', done: false })
      callStack.forEach(fn => fn())
      renderer._emitChange({ type: 'rehydrate', done: true })
    },

    /**
     * generates a unique style id
     *
     * @param {Object} style - style object
     * @return {string} minimal string id
     */
    _generateStyleId(style) {
      const styleHash = generateStyleHash(style)

      if (renderer.ids.indexOf(styleHash) === -1) {
        renderer.ids.push(styleHash)
      }

      return renderer.ids.indexOf(styleHash).toString(36)
    },

    /**
     * calls each listener with a change object
     * gets only called if something actually changes
     *
     * @param {Function} callback - callback function which will be executed
     * @return {Object} equivalent unsubscribe method
     */
    _emitChange(change) {
      renderer.listeners.forEach(listener => listener(change, renderer))
    },

    /**
     * iterates a style object and renders each rule to the cache
     *
     * @param {string} className - className reference to be rendered to
     * @param {Object} style - style object which is rendered
     */
    _renderStyle(className, style, pseudo = '', media = '') {
      const ruleset = Object.keys(style).reduce((ruleset, property) => {
        const value = style[property]
        // recursive object iteration in order to render
        // pseudo class and media class declarations
        if (value instanceof Object && !Array.isArray(value)) {
          // allow pseudo classes, attribute selectors and the child selector
          if (property.match(/^(:|\[|>)/) !== null) {
            renderer._renderStyle(className, value, pseudo + property, media)
          } else if (property.substr(0, 6) === '@media') {
            // combine media query rules with an `and`
            const query = property.slice(6).trim()
            const combinedMedia = media.length > 0 ? media + ' and ' + query : query
            renderer._renderStyle(className, value, pseudo, combinedMedia)
          }
        } else {
          ruleset[property] = value
        }
        return ruleset
      }, { })

      // add styles to the cache
      if (Object.keys(ruleset).length > 0) {
        renderer.rendered[className] = true

        const css = cssifyObject(ruleset)
        const selector = '.' + className + pseudo
        const cssRule = selector + '{' + css + '}'

        if (media.length > 0) {
          if (!renderer.mediaRules.hasOwnProperty(media)) {
            renderer.mediaRules[media] = ''
          }

          renderer.mediaRules[media] += cssRule
        } else {
          renderer.rules += cssRule
        }

        renderer._emitChange({
          selector: selector,
          style: ruleset,
          css: css,
          media: media,
          type: 'rule'
        })
      }
    }
  }

  // initial setup
  renderer.keyframePrefixes.push('')
  renderer.clear()

  // enhance renderer with passed set of enhancers
  if (config.enhancers) {
    config.enhancers.forEach(enhancer => renderer = enhancer(renderer))
  }

  return renderer
}
