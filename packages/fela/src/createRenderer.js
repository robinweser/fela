/* @flow */
import cssifyDeclaration from 'css-in-js-utils/lib/cssifyDeclaration'
import assignStyle from 'css-in-js-utils/lib/assignStyle'
import arrayEach from 'fast-loops/lib/arrayEach'

import {
  generateCombinedMediaQuery,
  generateCSSRule,
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
import cssifyStaticStyle from './cssifyStaticStyle'
import generateUniqueHash from './generateUniqueHash'
import generateStaticReference from './generateStaticReference'
import getFontFormat from './getFontFormat'
import getFontUrl from './getFontUrl'
import toCSSString from './toCSSString'

import type {
  DOMRenderer,
  DOMRendererConfig,
} from '../../../flowtypes/DOMRenderer'
import type { FontProperties } from '../../../flowtypes/FontProperties'

function isPlainObject(obj) {
  return typeof obj === 'object' && !Array.isArray(obj)
}

export default function createRenderer(
  config: DOMRendererConfig = {}
): DOMRenderer {
  let renderer: DOMRenderer = {
    listeners: [],
    keyframePrefixes: config.keyframePrefixes || ['-webkit-', '-moz-'],
    plugins: config.plugins || [],
    mediaQueryOrder: config.mediaQueryOrder || [],
    supportQueryOrder: config.supportQueryOrder || [],
    selectorPrefix: config.selectorPrefix || '',

    nodes: {},
    // use a flat cache object with pure string references
    // to achieve maximal lookup performance and memoization speed
    cache: {},

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
        const animationName = renderer._generateUniqueHash(keyframeReference)

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
            (agg, local) => (agg += ` local(${getFontUrl(local)}), `),
            ''
          )}${files
            .map(
              src => `url(${getFontUrl(src)}) format('${getFontFormat(src)}')`
            )
            .join(',')}`,
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

    renderStatic(staticStyle: Object | string, selector?: string): void {
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

    subscribe(callback: Function): { unsubscribe: Function } {
      renderer.listeners.push(callback)

      return {
        unsubscribe: () =>
          renderer.listeners.splice(renderer.listeners.indexOf(callback), 1),
      }
    },

    clear() {
      renderer.cache = {}

      renderer._emitChange({
        type: CLEAR_TYPE,
      })
    },

    _mergeStyle: assignStyle,
    _generateUniqueHash: generateUniqueHash,

    _renderStyleToClassNames(
      { _className, ...style }: Object,
      pseudo: string = '',
      media: string = '',
      support: string = ''
    ): string {
      let classNames = _className ? ` ${_className}` : ''

      for (const property in style) {
        const value = style[property]

        // TODO: this whole part could be trimmed
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
            // TODO: warning
          }
        } else {
          const declarationReference =
            support + media + pseudo + property + value

          if (!renderer.cache.hasOwnProperty(declarationReference)) {
            // we remove undefined values to enable
            // usage of optional props without side-effects
            if (isUndefinedValue(value)) {
              renderer.cache[declarationReference] = {
                className: '',
              }
              /* eslint-disable no-continue */
              continue
              /* eslint-enable */
            }

            const className =
              renderer.selectorPrefix +
              renderer._generateUniqueHash(declarationReference)

            const declaration = cssifyDeclaration(property, value)
            const selector = generateCSSSelector(className, pseudo)

            const change = {
              type: RULE_TYPE,
              className,
              selector,
              declaration,
              media,
              support,
            }

            renderer.cache[declarationReference] = change
            renderer._emitChange(change)
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

    _emitChange(change: Object): void {
      arrayEach(renderer.listeners, listener => listener(change))
    },
  }

  // initial setup
  renderer.keyframePrefixes.push('')

  if (config.enhancers) {
    arrayEach(config.enhancers, enhancer => {
      renderer = enhancer(renderer)
    })
  }

  return renderer
}
