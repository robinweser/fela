/* @flow */
import cssifyDeclaration from 'css-in-js-utils/lib/cssifyDeclaration'
import arrayEach from 'fast-loops/lib/arrayEach'
import arrayReduce from 'fast-loops/lib/arrayReduce'
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

import type {
  DOMRenderer,
  DOMRendererConfig,
} from '../../../flowtypes/DOMRenderer'
import type { FontProperties } from '../../../flowtypes/FontProperties'

export default function createRenderer(
  config: DOMRendererConfig = {}
): DOMRenderer {
  let renderer: DOMRenderer = {
    listeners: [],
    keyframePrefixes: config.keyframePrefixes || ['-webkit-', '-moz-'],
    plugins: config.plugins || [],
    sortMediaQuery:
      config.sortMediaQuery || sortMediaQuery(config.mediaQueryOrder),
    supportQueryOrder: config.supportQueryOrder || [],
    styleNodeAttributes: config.styleNodeAttributes || {},
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

    renderRule(rule: Function, props: Object = {}): string {
      return renderer._renderStyle(rule(props, renderer), props)
    },

    renderKeyframe(keyframe: Function, props: Object = {}): string {
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

    generateAnimationName(_props: Object) {
      return generateAnimationName(renderer.getNextKeyframeIdentifier())
    },

    renderFont(
      family: string,
      files: Array<string>,
      properties: FontProperties = {}
    ): string {
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
      renderer.uniqueRuleIdentifier = 0
      renderer.uniqueKeyframeIdentifier = 0
      renderer.cache = {}

      renderer._emitChange({
        type: CLEAR_TYPE,
      })
    },

    _renderStyle(style: Object = {}, props: Object = {}): string {
      const processedStyle = processStyleWithPlugins(
        renderer,
        style,
        RULE_TYPE,
        props
      )

      return renderer._renderStyleToClassNames(processedStyle).slice(1)
    },

    _renderStyleToClassNames(
      { _className, ...style }: Object,
      pseudo: string = '',
      media: string = '',
      support: string = ''
    ): string {
      let classNames = _className ? ` ${_className}` : ''

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

              renderer._renderStyleToCache(
                cacheReference,
                processed.property,
                processed.value,
                processed.pseudo,
                processed.media,
                processed.support
              )

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
        config.specificityPrefix
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

    generateClassName(
      property: string,
      value: any,
      pseudo?: string,
      media?: string,
      support?: string
    ): string {
      return generateClassName(
        renderer.getNextRuleIdentifier,
        renderer.filterClassName
      )
    },

    _emitChange(change: Object): void {
      arrayEach(renderer.listeners, (listener) => listener(change))
    },
  }

  // initial setup
  renderer.keyframePrefixes.push('')

  if (config.optimizeCaching) {
    renderer.optimizedPlugins = renderer.plugins
      .filter((plugin) => plugin.optimized)
      .map((plugin) => plugin.optimized)

    if (renderer.optimizedPlugins.length > 0) {
      renderer.plugins = renderer.plugins.filter((plugin) => !plugin.optimized)
      renderer.cacheMap = {}
    }
  }

  if (config.enhancers) {
    arrayEach(config.enhancers, (enhancer) => {
      renderer = enhancer(renderer)
    })
  }

  return renderer
}
