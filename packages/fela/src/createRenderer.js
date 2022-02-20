import { cssifyDeclaration } from 'css-in-js-utils'
import { arrayEach, arrayReduce, arrayFilter } from 'fast-loops'
import isPlainObject from 'isobject'

import {
  generateDeclarationReference,
  generateCombinedMediaQuery,
  generateCSSSelector,
  isMediaQuery,
  isNestedSelector,
  isUndefinedValue,
  isSupport,
  normalizeNestedProperty,
  processStyleWithPlugins,
  STATIC_TYPE,
  RULE_TYPE,
  KEYFRAME_TYPE,
  FONT_TYPE,
  CLEAR_TYPE,
} from 'fela-utils'

import cssifyFontFace from './cssifyFontFace'
import cssifyKeyframe from './cssifyKeyframe'
import cssifyKeyframeRule from './cssifyKeyframeRule'
import cssifyStaticStyle from './cssifyStaticStyle'
import generateAnimationName from './generateAnimationName'
import generateClassName from './generateClassName'
import generateFontSource from './generateFontSource'
import generateStaticReference from './generateStaticReference'
import getFontLocals from './getFontLocals'
import isSafeClassName from './isSafeClassName'
import toCSSString from './toCSSString'
import validateSelectorPrefix from './validateSelectorPrefix'
import sortMediaQuery from './sortMediaQuery'

export default function createRenderer(config = {}) {
  let renderer = {
    listeners: [],
    keyframePrefixes: config.keyframePrefixes || ['-webkit-', '-moz-'],
    plugins: config.plugins || [],
    sortMediaQuery:
      config.sortMediaQuery || sortMediaQuery(config.mediaQueryOrder),
    supportQueryOrder: config.supportQueryOrder || [],
    styleNodeAttributes: config.styleNodeAttributes || {},
    propertyPriority: config.propertyPriority || {},
    ruleOrder: [
      /^:link/,
      /^:visited/,
      /^:hover/,
      /^:focus-within/,
      /^:focus/,
      /^:active/,
    ],
    selectorPrefix: validateSelectorPrefix(config.selectorPrefix),
    specificityPrefix: config.specificityPrefix || '',
    filterClassName: config.filterClassName || isSafeClassName,
    devMode: config.devMode || false,

    uniqueRuleIdentifier: 0,
    uniqueKeyframeIdentifier: 0,

    nodes: {},
    scoreIndex: {},
    // use a flat cache object with pure string references
    // to achieve maximal lookup performance and memoization speed
    cache: {},

    getNextRuleIdentifier() {
      return ++renderer.uniqueRuleIdentifier
    },

    getNextKeyframeIdentifier() {
      return ++renderer.uniqueKeyframeIdentifier
    },

    renderRule(rule, props = {}) {
      return renderer._renderStyle(rule(props, renderer), props)
    },

    renderKeyframe(keyframe, props = {}) {
      const resolvedKeyframe = keyframe(props, renderer)
      const processedKeyframe = processStyleWithPlugins(
        renderer,
        resolvedKeyframe,
        KEYFRAME_TYPE,
        props
      )

      const keyframeReference = cssifyKeyframeRule(processedKeyframe)

      if (!renderer.cache.hasOwnProperty(keyframeReference)) {
        // use another unique identifier to ensure minimal css markup
        const animationName =
          renderer.selectorPrefix + renderer.generateAnimationName(props)

        const cssKeyframe = cssifyKeyframe(
          processedKeyframe,
          animationName,
          renderer.keyframePrefixes,
          keyframeReference
        )

        const change = {
          type: KEYFRAME_TYPE,
          keyframe: cssKeyframe,
          name: animationName,
        }

        renderer.cache[keyframeReference] = change
        renderer._emitChange(change)
      }

      return renderer.cache[keyframeReference].name
    },

    generateAnimationName(_props) {
      return generateAnimationName(renderer.getNextKeyframeIdentifier())
    },

    renderFont(family, files, properties = {}) {
      const { localAlias, ...otherProperties } = properties

      const fontReference = family + JSON.stringify(properties)
      const fontLocals = getFontLocals(localAlias)

      if (!renderer.cache.hasOwnProperty(fontReference)) {
        const fontFamily = toCSSString(family)

        const fontFace = {
          ...otherProperties,
          src: generateFontSource(files, fontLocals),
          fontFamily,
        }

        const cssFontFace = cssifyFontFace(fontFace)

        const change = {
          type: FONT_TYPE,
          fontFace: cssFontFace,
          fontFamily,
        }

        renderer.cache[fontReference] = change
        renderer._emitChange(change)
      }

      return renderer.cache[fontReference].fontFamily
    },

    renderStatic(staticStyle, selector) {
      const staticReference = generateStaticReference(staticStyle, selector)

      if (!renderer.cache.hasOwnProperty(staticReference)) {
        const cssDeclarations = cssifyStaticStyle(staticStyle, renderer)

        const change = {
          type: STATIC_TYPE,
          css: cssDeclarations,
          selector,
        }

        renderer.cache[staticReference] = change
        renderer._emitChange(change)
      }
    },

    subscribe(callback) {
      renderer.listeners.push(callback)

      return {
        unsubscribe: () =>
          renderer.listeners.splice(renderer.listeners.indexOf(callback), 1),
      }
    },

    clear() {
      renderer.uniqueRuleIdentifier = 0
      renderer.uniqueKeyframeIdentifier = 0
      renderer.cache = {}

      renderer._emitChange({
        type: CLEAR_TYPE,
      })
    },

    _renderStyle(style = {}, props = {}) {
      const _className = style._className + ' ' || ''
      delete style._className

      const processedStyle = processStyleWithPlugins(
        renderer,
        style,
        RULE_TYPE,
        props,
        renderer.unoptimizedPlugins || renderer.plugins
      )

      return (
        _className + renderer._renderStyleToClassNames(processedStyle).substr(1)
      )
    },

    _renderStyleToClassNames(style, pseudo = '', media = '', support = '') {
      let classNames = ''

      for (const property in style) {
        const value = style[property]

        if (isPlainObject(value)) {
          if (isNestedSelector(property)) {
            classNames += renderer._renderStyleToClassNames(
              value,
              pseudo + normalizeNestedProperty(property),
              media,
              support
            )
          } else if (isMediaQuery(property)) {
            const combinedMediaQuery = generateCombinedMediaQuery(
              media,
              property.slice(6).trim()
            )
            classNames += renderer._renderStyleToClassNames(
              value,
              pseudo,
              combinedMediaQuery,
              support
            )
          } else if (isSupport(property)) {
            const combinedSupport = generateCombinedMediaQuery(
              support,
              property.slice(9).trim()
            )
            classNames += renderer._renderStyleToClassNames(
              value,
              pseudo,
              media,
              combinedSupport
            )
          } else {
            console.warn(`The object key "${property}" is not a valid nested key in Fela.
Maybe you forgot to add a plugin to resolve it?
Check http://fela.js.org/docs/basics/Rules.html#styleobject for more information.`)
          }
        } else {
          let declarationReference = generateDeclarationReference(
            property,
            value,
            pseudo,
            media,
            support
          )

          if (renderer.cacheMap) {
            if (!renderer.cacheMap.hasOwnProperty(declarationReference)) {
              const pluginInterface = {
                property,
                value,
                pseudo,
                media,
                support,
              }

              const processed = arrayReduce(
                renderer.optimizedPlugins,
                (processed, plugin) => plugin(processed, renderer),
                pluginInterface
              )

              const cacheReference = generateDeclarationReference(
                processed.property,
                processed.value,
                processed.pseudo,
                processed.media,
                processed.support
              )

              if (!renderer.cache.hasOwnProperty(cacheReference)) {
                renderer._renderStyleToCache(
                  cacheReference,
                  processed.property,
                  processed.value,
                  processed.pseudo,
                  processed.media,
                  processed.support
                )
              }

              renderer.cacheMap[declarationReference] = cacheReference
            }

            declarationReference = renderer.cacheMap[declarationReference]
          }

          if (!renderer.cache.hasOwnProperty(declarationReference)) {
            renderer._renderStyleToCache(
              declarationReference,
              property,
              value,
              pseudo,
              media,
              support
            )
          }

          const cachedClassName = renderer.cache[declarationReference].className

          // only append if we got a class cached
          if (cachedClassName) {
            classNames += ` ${cachedClassName}`
          }
        }
      }

      return classNames
    },

    _renderStyleToCache(reference, property, value, pseudo, media, support) {
      // we remove undefined values to enable
      // usage of optional props without side-effects
      if (isUndefinedValue(value)) {
        renderer.cache[reference] = {
          className: '',
        }

        return
      }

      const className =
        renderer.selectorPrefix +
        renderer.generateClassName(property, value, pseudo, media, support)

      const declaration = cssifyDeclaration(property, value)
      const selector = generateCSSSelector(
        className,
        pseudo,
        config.specificityPrefix,
        renderer.propertyPriority[property]
      )

      const change = {
        type: RULE_TYPE,
        className,
        selector,
        declaration,
        pseudo,
        media,
        support,
      }

      renderer.cache[reference] = change
      renderer._emitChange(change)
    },

    generateClassName(property, value, pseudo, media, support) {
      return generateClassName(
        renderer.getNextRuleIdentifier,
        renderer.filterClassName
      )
    },

    _emitChange(change) {
      arrayEach(renderer.listeners, (listener) => listener(change))
    },
  }

  // initial setup
  renderer.keyframePrefixes.push('')

  renderer.optimizedPlugins = arrayReduce(
    renderer.plugins,
    (plugins, plugin) => {
      if (plugin.optimized) {
        plugins.push(plugin.optimized)
      }

      return plugins
    },
    []
  )

  // only enable the cache map if we have optimized plugins
  if (renderer.optimizedPlugins.length > 0) {
    renderer.cacheMap = {}
    renderer.unoptimizedPlugins = arrayFilter(
      renderer.plugins,
      (plugin) => !plugin.optimized
    )
  }

  if (config.enhancers) {
    arrayEach(config.enhancers, (enhancer) => {
      renderer = enhancer(renderer)
    })
  }

  return renderer
}
