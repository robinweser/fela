/* @flow */
import cssifyDeclaration from 'css-in-js-utils/lib/cssifyDeclaration'
import cssifyFontFace from './utils/cssifyFontFace'
import cssifyKeyframe from './utils/cssifyKeyframe'
import cssifyMediaQueryRules from './utils/cssifyMediaQueryRules'

import generateAnimationName from './utils/generateAnimationName'
import generateClassName from './utils/generateClassName'
import generateCombinedMediaQuery from './utils/generateCombinedMediaQuery'
import generateCSSRule from './utils/generateCSSRule'
import generateCSSSelector from './utils/generateCSSSelector'
import cssifyStaticStyle from './utils/cssifyStaticStyle'
import generateStaticReference from './utils/generateStaticReference'

import isMediaQuery from './utils/isMediaQuery'
import isNestedSelector from './utils/isNestedSelector'
import isUndefinedValue from './utils/isUndefinedValue'
import isObject from './utils/isObject'

import normalizeNestedProperty from './utils/normalizeNestedProperty'
import applyMediaRulesInOrder from './utils/applyMediaRulesInOrder'
import processStyleWithPlugins from './utils/processStyleWithPlugins'
import toCSSString from './utils/toCSSString'
import checkFontFormat from './utils/checkFontFormat'
import objectReduce from './utils/objectReduce'
import arrayEach from './utils/arrayEach'

import {
  STATIC_TYPE,
  RULE_TYPE,
  KEYFRAME_TYPE,
  FONT_TYPE,
  CLEAR_TYPE
} from './utils/styleTypes'

import type { DOMRenderer, DOMRendererConfig } from '../flowtypes/DOMRenderer'
import type FontProperties from '../flowtypes/FontProperties'

export default function createRenderer(
  config: DOMRendererConfig = {}
): DOMRenderer {
  let renderer: DOMRenderer = {
    listeners: [],
    keyframePrefixes: config.keyframePrefixes || ['-webkit-', '-moz-'],
    plugins: config.plugins || [],
    mediaQueryOrder: config.mediaQueryOrder || [],
    selectorPrefix: config.selectorPrefix || '',
    fontFaces: '',
    keyframes: '',
    statics: '',
    rules: '',
    // apply media rules in an explicit order to ensure
    // correct media query execution order
    mediaRules: applyMediaRulesInOrder(config.mediaQueryOrder || []),
    uniqueRuleIdentifier: 0,
    uniqueKeyframeIdentifier: 0,
    // use a flat cache object with pure string references
    // to achieve maximal lookup performance and memoization speed
    cache: {},

    renderRule(rule: Function, props: Object = {}): string {
      const processedStyle = processStyleWithPlugins(
        renderer.plugins,
        rule(props),
        RULE_TYPE
      )
      return renderer._renderStyleToClassNames(processedStyle).slice(1)
    },

    renderKeyframe(keyframe: Function, props: Object = {}): string {
      const resolvedKeyframe = keyframe(props)
      const keyframeReference = JSON.stringify(resolvedKeyframe)

      if (!renderer.cache.hasOwnProperty(keyframeReference)) {
        // use another unique identifier to ensure minimal css markup
        const animationName = generateAnimationName(
          ++renderer.uniqueKeyframeIdentifier
        )

        const processedKeyframe = processStyleWithPlugins(
          renderer.plugins,
          resolvedKeyframe,
          KEYFRAME_TYPE
        )

        const cssKeyframe = cssifyKeyframe(
          processedKeyframe,
          animationName,
          renderer.keyframePrefixes
        )

        renderer.cache[keyframeReference] = animationName
        renderer.keyframes += cssKeyframe

        renderer._emitChange({
          name: animationName,
          keyframe: cssKeyframe,
          type: KEYFRAME_TYPE
        })
      }

      return renderer.cache[keyframeReference]
    },

    renderFont(
      family: string,
      files: Array<string>,
      properties: FontProperties = {}
    ): string {
      const fontReference = family + JSON.stringify(properties)

      if (!renderer.cache.hasOwnProperty(fontReference)) {
        const fontFamily = toCSSString(family)

        // TODO: proper font family generation with error proofing
        const fontFace = {
          ...properties,
          src: files
            .map(src => `url('${src}') format('${checkFontFormat(src)}')`)
            .join(','),
          fontFamily
        }

        const cssFontFace = cssifyFontFace(fontFace)
        renderer.cache[fontReference] = fontFamily
        renderer.fontFaces += cssFontFace

        renderer._emitChange({
          fontFamily,
          fontFace: cssFontFace,
          type: FONT_TYPE
        })
      }

      return renderer.cache[fontReference]
    },

    renderStatic(staticStyle: Object | string, selector?: string): void {
      const staticReference = generateStaticReference(staticStyle, selector)

      if (!renderer.cache.hasOwnProperty(staticReference)) {
        const cssDeclarations = cssifyStaticStyle(
          staticStyle,
          renderer.plugins
        )
        renderer.cache[staticReference] = ''

        if (typeof staticStyle === 'string') {
          renderer.statics += cssDeclarations
          renderer._emitChange({
            type: STATIC_TYPE,
            css: cssDeclarations
          })
        } else if (selector) {
          renderer.statics += generateCSSRule(selector, cssDeclarations)
          renderer._emitChange({
            selector,
            declaration: cssDeclarations,
            type: RULE_TYPE,
            static: true,
            media: ''
          })
        }
      }
    },

    renderToString(): string {
      const basicCSS = renderer.fontFaces +
        renderer.statics +
        renderer.keyframes +
        renderer.rules

      return objectReduce(
        renderer.mediaRules,
        (css, rules, query) => css + cssifyMediaQueryRules(query, rules),
        basicCSS
      )
    },

    subscribe(callback: Function): {unsubscribe: Function} {
      renderer.listeners.push(callback)

      return {
        unsubscribe: () =>
          renderer.listeners.splice(renderer.listeners.indexOf(callback), 1)
      }
    },

    clear() {
      renderer.fontFaces = ''
      renderer.keyframes = ''
      renderer.statics = ''
      renderer.rules = ''
      renderer.mediaRules = applyMediaRulesInOrder(renderer.mediaQueryOrder)
      renderer.uniqueRuleIdentifier = 0
      renderer.uniqueKeyframeIdentifier = 0
      renderer.cache = {}

      renderer._emitChange({ type: CLEAR_TYPE })
    },

    _renderStyleToClassNames(
      style: Object,
      pseudo: string = '',
      media: string = ''
    ): string {
      let classNames = ''

      for (const property in style) {
        const value = style[property]

        if (isObject(value)) {
          if (isNestedSelector(property)) {
            classNames += renderer._renderStyleToClassNames(
              value,
              pseudo + normalizeNestedProperty(property),
              media
            )
          } else if (isMediaQuery(property)) {
            const combinedMediaQuery = generateCombinedMediaQuery(
              media,
              property.slice(6).trim()
            )

            classNames += renderer._renderStyleToClassNames(
              value,
              pseudo,
              combinedMediaQuery
            )
          } else {
            // TODO: warning
          }
        } else {
          const declarationReference = media + pseudo + property + value

          if (!renderer.cache.hasOwnProperty(declarationReference)) {
            // we remove undefined values to enable
            // usage of optional props without side-effects
            if (isUndefinedValue(value)) {
              renderer.cache[declarationReference] = ''
              /* eslint-disable no-continue */
              continue
              /* eslint-enable */
            }

            const className = renderer.selectorPrefix +
              generateClassName(++renderer.uniqueRuleIdentifier)

            renderer.cache[declarationReference] = className

            const cssDeclaration = cssifyDeclaration(property, value)
            const selector = generateCSSSelector(className, pseudo)
            const cssRule = generateCSSRule(selector, cssDeclaration)

            if (media.length > 0) {
              if (!renderer.mediaRules.hasOwnProperty(media)) {
                renderer.mediaRules[media] = ''
              }

              renderer.mediaRules[media] += cssRule
            } else {
              renderer.rules += cssRule
            }

            renderer._emitChange({
              selector,
              declaration: cssDeclaration,
              media,
              type: RULE_TYPE
            })
          }

          classNames += ` ${renderer.cache[declarationReference]}`
        }
      }

      return classNames
    },

    _emitChange(change: Object): void {
      arrayEach(renderer.listeners, listener => listener(change))
    }
  }

  // initial setup
  renderer.keyframePrefixes.push('')
  renderer.clear()

  if (config.enhancers) {
    arrayEach(config.enhancers, (enhancer) => {
      renderer = enhancer(renderer)
    })
  }

  return renderer
}
