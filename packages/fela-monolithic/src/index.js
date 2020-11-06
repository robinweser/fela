/* @flow */
import objectReduce from 'fast-loops/lib/objectReduce'
import cssifyObject from 'css-in-js-utils/lib/cssifyObject'
import isPlainObject from 'isobject'
import {
  isSupport,
  isMediaQuery,
  isNestedSelector,
  isUndefinedValue,
  normalizeNestedProperty,
  processStyleWithPlugins,
  generateCombinedMediaQuery,
  generateCSSSelector,
  RULE_TYPE,
} from 'fela-utils'

import generateMonolithicClassName from './generateMonolithicClassName'

import type DOMRenderer from '../../../flowtypes/DOMRenderer'
import type MonolithicRenderer from '../../../flowtypes/MonolithicRenderer'

function useMonolithicRenderer(
  renderer: DOMRenderer,
  prettySelectors: boolean = false
): MonolithicRenderer {
  renderer.prettySelectors = prettySelectors

  renderer._renderStyleToCache = (
    className: string,
    style: Object,
    pseudo: string = '',
    media: string = '',
    support: string = ''
  ) => {
    const ruleSet = objectReduce(
      style,
      (ruleset, value, property) => {
        if (isPlainObject(value)) {
          if (isNestedSelector(property)) {
            renderer._renderStyleToCache(
              className,
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

            renderer._renderStyleToCache(
              className,
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
            renderer._renderStyleToCache(
              className,
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
        } else if (!isUndefinedValue(value)) {
          ruleset[property] = value
        }

        return ruleset
      },
      {}
    )

    if (Object.keys(ruleSet).length > 0) {
      const css = cssifyObject(ruleSet)
      const selector = generateCSSSelector(
        className,
        pseudo,
        renderer.specificityPrefix
      )

      const change = {
        type: RULE_TYPE,
        className,
        selector,
        declaration: css,
        media,
        pseudo,
        support,
      }

      const declarationReference = selector + media + support
      renderer.cache[declarationReference] = change
      renderer._emitChange(change)
    }
  }

  renderer._renderStyleToClassNames = (
    { _className, ...style }: Object,
    rule: Function
  ): string => {
    if (Object.keys(style).length < 1) {
      return ''
    }

    const localRulePrefix =
      renderer.prettySelectors && (rule.ruleName || rule.name)
        ? `${rule.ruleName || rule.name}_`
        : ''

    const className = generateMonolithicClassName(
      style,
      (renderer.selectorPrefix || '') + (rule.selectorPrefix || localRulePrefix)
    )

    if (!renderer.cache.hasOwnProperty(className)) {
      renderer._renderStyleToCache(className, style)
      renderer.cache[className] = {}
    }

    return (_className ? _className + ' ' : '') + className
  }

  renderer.renderRule = (rule: Function, props: Object = {}): string =>
    renderer._renderStyle(rule(props, renderer), props, rule)

  renderer._renderStyle = (
    style: Object = {},
    props: Object = {},
    rule?: Function
  ): string => {
    const processedStyle = processStyleWithPlugins(
      renderer,
      style,
      RULE_TYPE,
      props
    )

    return renderer._renderStyleToClassNames(processedStyle, rule || {})
  }

  renderer.subscribe(event => {
    if (event.type === 'REHYDRATATION_FINISHED') {
      // Repair cache for monolithic usage
      renderer.cache = Object.keys(renderer.cache).reduce((acc, key) => {
        const item = renderer.cache[key]
        if (item.type === 'RULE') {
          return Object.assign(acc, {
            [item.className + item.media + item.support]: item,
          })
        }
        return Object.assign(acc, { [key]: item })
      }, {})
    }
  })

  return renderer
}

export default function monolithic(options: Object = {}) {
  return (renderer: DOMRenderer) =>
    useMonolithicRenderer(
      renderer,
      process.env.NODE_ENV !== 'production' && options.prettySelectors
    )
}
