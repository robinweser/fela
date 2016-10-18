import generatePropsReference from './utils/generatePropsReference'
import sortedStringify from './utils/sortedStringify'
import getFontFormat from './utils/getFontFormat'

import processStyle from './utils/processStyle'
import diffStyle from './utils/diffStyle'

import cssifyKeyframe from './utils/cssifyKeyframe'
import cssifyObject from './utils/cssifyObject'

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

    /**
     * clears the sheet's cache but keeps all listeners
     */
    clear() {
      renderer.fontFaces = ''
      renderer.keyframes = ''
      renderer.statics = ''
      renderer.rules = ''
      renderer.mediaRules = { }
      renderer.rendered = { }
      renderer.base = { }
      renderer.ids = [ ]
      renderer.callStack = [ ]

      // emit changes to notify subscribers
      renderer._emitChange({ type: 'clear' })
    },

    /**
     * renders a new rule variation and caches the result
     *
     * @param {Function} rule - rule which gets rendered
     * @param {Object?} props - properties used to render
     * @return {string} className to reference the rendered rule
     */
    renderRule(rule, props = { }) {
      // rendering a rule for the first time
      // will create an ID reference
      if (renderer.ids.indexOf(rule) < 0) {
        renderer.ids.push(rule)

        // directly render the static base style to be able
        // to diff future dynamic style with those
        if (Object.keys(props).length > 0) {
          renderer.renderRule(rule, { })
        }
      }

      // uses the reference ID and the props to generate an unique className
      const ruleId = renderer.ids.indexOf(rule)

      const classNamePrefix = renderer.prettySelectors && rule.name ? rule.name + '_' : 'c'
      const className = classNamePrefix + ruleId + generatePropsReference(props)

      // only if the cached rule has not already been rendered
      // with a specific set of properties it actually renders
      if (!renderer.rendered.hasOwnProperty(className)) {
        // process style using each plugin
        const style = processStyle(rule(props), {
          type: 'rule',
          className: className,
          id: ruleId,
          props: props,
          rule: rule
        }, renderer.plugins)

        // diff style objects with base styles
        const diffedStyle = diffStyle(style, renderer.base[ruleId])

        renderer.rendered[className] = false

        if (Object.keys(diffedStyle).length > 0) {
          renderer._renderStyle(className, diffedStyle)
        }

        // keep static style to diff dynamic onces later on
        if (className === classNamePrefix + ruleId) {
          renderer.base[ruleId] = diffedStyle
        }
      }

      const baseClassName = classNamePrefix + ruleId
      // if current className is empty
      // return either the static class or empty string
      if (!renderer.rendered[className]) {
        return renderer.rendered[baseClassName] ? baseClassName : ''
      }

      renderer.callStack.push(renderer.renderRule.bind(renderer, rule, props))

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
      // rendering a Keyframe for the first time
      // will create cache entries and an ID reference
      if (renderer.ids.indexOf(keyframe) < 0) {
        renderer.ids.push(keyframe)
      }

      const propsReference = generatePropsReference(props)
      const prefix = renderer.prettySelectors && keyframe.name ? keyframe.name + '_' : 'k'
      const animationName = prefix + renderer.ids.indexOf(keyframe) + propsReference

      // only if the cached keyframe has not already been rendered
      // with a specific set of properties it actually renders
      if (!renderer.rendered.hasOwnProperty(animationName)) {
        const processedKeyframe = processStyle(keyframe(props), {
          type: 'keyframe',
          keyframe: keyframe,
          props: props,
          animationName: animationName,
          id: renderer.ids.indexOf(keyframe)
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
      const key = family + generatePropsReference(properties)

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
      const reference = typeof style === 'string' ? style : selector + sortedStringify(style)

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
        css += '@media ' + media + '{' + renderer.mediaRules[media] + '}'
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
