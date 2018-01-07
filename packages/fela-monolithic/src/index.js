/* @flow */
/* eslint-disable no-continue */
import objectReduce from 'fast-loops/lib/objectReduce'
import cssifyObject from 'css-in-js-utils/lib/cssifyObject'
import {
  isSupport,
  isMediaQuery,
  isNestedSelector,
  isUndefinedValue,
  normalizeNestedProperty,
  processStyleWithPlugins,
  generateCombinedMediaQuery,
  generateCSSSelector,
  generateCSSRule,
  RULE_TYPE,
} from 'fela-utils'

import generateMonolithicClassName from './generateMonolithicClassName'

import type DOMRenderer from '../../../flowtypes/DOMRenderer'
import type MonolithicRenderer from '../../../flowtypes/MonolithicRenderer'

function isPlainObject(obj: any): boolean {
  return typeof obj === 'object' && !Array.isArray(obj)
}

function useMonolithicRenderer(
  renderer: DOMRenderer,
  prettySelectors: boolean = false
): MonolithicRenderer {
  renderer.prettySelectors = prettySelectors

  // monolithic output can not be rehydrated
  renderer.enableRehydration = false

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
            // TODO: warning
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
      const selector = generateCSSSelector(className, pseudo)

      const change = {
        type: RULE_TYPE,
        className,
        selector,
        declaration: css,
        media,
      }

      const declarationReference = selector + media + support
      renderer.cache[declarationReference] = change
      renderer._emitChange(change)
    }
  }

  renderer._renderStyleToClassNames = (
    style: Object,
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

    return className
  }

  renderer.renderRule = (rule: Function, props: Object = {}): string => {
    const processedStyle = processStyleWithPlugins(
      renderer,
      rule(props, renderer),
      RULE_TYPE,
      props
    )
    return renderer._renderStyleToClassNames(processedStyle, rule)
  }

  return renderer
}

export default function monolithic(options: Object = {}) {
  return (renderer: DOMRenderer) =>
    useMonolithicRenderer(
      renderer,
      process.env.NODE_ENV !== 'production' && options.prettySelectors
    )
}
