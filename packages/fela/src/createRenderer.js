/* @flow */
import cssifyDeclaration from 'css-in-js-utils/lib/cssifyDeclaration'

import {
  cssifyFontFace,
  cssifyKeyframe,
  cssifyStaticStyle,
  generateAnimationName,
  generateClassName,
  generateCombinedMediaQuery,
  generateCSSRule,
  generateCSSSelector,
  generateStaticReference,
  isMediaQuery,
  isNestedSelector,
  isUndefinedValue,
  isObject,
  normalizeNestedProperty,
  applyMediaRulesInOrder,
  processStyleWithPlugins,
  toCSSString,
  checkFontFormat,
  checkFontUrl,
  arrayEach,
  STATIC_TYPE,
  RULE_TYPE,
  KEYFRAME_TYPE,
  FONT_TYPE,
  CLEAR_TYPE
} from 'fela-utils'

import { renderToString } from 'fela-tools'

import type {
  DOMRenderer,
  DOMRendererConfig
} from '../../../flowtypes/DOMRenderer'
import type { FontProperties } from '../../../flowtypes/FontProperties'

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
    styleNodes: {},
    filterClassName: config.filterClassName,

    renderRule(rule: Function, props: Object = {}): string {
      const processedStyle = processStyleWithPlugins(
        renderer,
        rule(props, renderer),
        RULE_TYPE,
        props
      )
      return renderer._renderStyleToClassNames(processedStyle).slice(1)
    },

    renderKeyframe(keyframe: Function, props: Object = {}): string {
      const resolvedKeyframe = keyframe(props, renderer)
      const keyframeReference = JSON.stringify(resolvedKeyframe)

      if (!renderer.cache.hasOwnProperty(keyframeReference)) {
        // use another unique identifier to ensure minimal css markup
        const animationName = generateAnimationName(
          ++renderer.uniqueKeyframeIdentifier
        )

        const processedKeyframe = processStyleWithPlugins(
          renderer,
          resolvedKeyframe,
          KEYFRAME_TYPE,
          props
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
      const fontLocals =
        typeof properties.localAlias === 'string'
          ? [properties.localAlias]
          : properties.localAlias && properties.localAlias.constructor === Array
            ? properties.localAlias.slice()
            : []

      if (!renderer.cache.hasOwnProperty(fontReference)) {
        const fontFamily = toCSSString(family)

        // remove the localAlias since we extraced the needed info
        properties.localAlias && delete properties.localAlias

        // TODO: proper font family generation with error proofing
        const fontFace = {
          ...properties,
          src: `${fontLocals.reduce(
            (agg, local) => (agg += ` local(${checkFontUrl(local)}), `),
            ''
          )}${files
            .map(
              src =>
                `url(${checkFontUrl(src)}) format('${checkFontFormat(src)}')`
            )
            .join(',')}`,
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
        const cssDeclarations = cssifyStaticStyle(staticStyle, renderer)
        renderer.cache[staticReference] = ''

        if (typeof staticStyle === 'string') {
          renderer.statics += cssDeclarations

          renderer._emitChange({
            type: STATIC_TYPE,
            css: cssDeclarations
          })
        } else if (selector) {
          renderer.statics += generateCSSRule(selector, cssDeclarations)
        }

        renderer._emitChange({
          type: STATIC_TYPE,
          css: cssDeclarations
        })
      }
    },
    renderToString(): string {
      return renderToString(renderer)
    },

    subscribe(callback: Function): { unsubscribe: Function } {
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
      { _className, ...style }: Object,
      pseudo: string = '',
      media: string = ''
    ): string {
      let classNames = _className || ''

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

            const className =
              renderer.selectorPrefix +
              generateClassName(
                ++renderer.uniqueRuleIdentifier,
                void 0,
                renderer.filterClassName
              )

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

          // only append if we got a class cached
          if (renderer.cache[declarationReference]) {
            classNames += ` ${renderer.cache[declarationReference]}`
          }
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
    arrayEach(config.enhancers, enhancer => {
      renderer = enhancer(renderer)
    })
  }

  return renderer
}
