/* @flow */
/* eslint-disable no-continue */
import cssifyObject from 'css-in-js-utils/lib/cssifyObject'

import isObject from '../utils/isObject'
import isMediaQuery from '../utils/isMediaQuery'
import isNestedSelector from '../utils/isNestedSelector'
import isUndefinedValue from '../utils/isUndefinedValue'

import objectReduce from '../utils/objectReduce'
import normalizeNestedProperty from '../utils/normalizeNestedProperty'

import generateCombinedMediaQuery from '../utils/generateCombinedMediaQuery'
import generateCSSSelector from '../utils/generateCSSSelector'
import generateCSSRule from '../utils/generateCSSRule'

import { RULE_TYPE } from '../utils/styleTypes'

import type DOMRenderer from '../../flowtypes/DOMRenderer'

function generateClassName(style: Object, prefix: string): string {
  if (style.className) {
    const name = prefix + style.className
    delete style.className
    return name
  }

  const stringified = JSON.stringify(style)
  let val = 5381
  let i = stringified.length

  while (i) {
    val = val * 33 ^ stringified.charCodeAt(--i)
  }

  return prefix + (val >>> 0).toString(36)
}

type MonoliticRenderer = {
  _renderStyleToCache: Function
};

function useMonolithicRenderer(
  renderer: DOMRenderer
): DOMRenderer & MonoliticRenderer {
  renderer._renderStyleToCache = (
    className: string,
    style: Object,
    pseudo: string = '',
    media: string = ''
  ) => {
    const ruleSet = objectReduce(
      style,
      (ruleset, value, property) => {
        if (isObject(value)) {
          if (isNestedSelector(property)) {
            renderer._renderStyleToCache(
              className,
              value,
              pseudo + normalizeNestedProperty(property),
              media
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
              combinedMediaQuery
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
      const cssRule = generateCSSRule(selector, css)

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
        declaration: css,
        media,

        type: RULE_TYPE
      })
    }
  }

  renderer._renderStyleToClassNames = (style: Object): string => {
    if (Object.keys(style).length < 1) {
      return ''
    }

    const className = generateClassName(style, renderer.selectorPrefix)

    if (!renderer.cache.hasOwnProperty(className)) {
      renderer._renderStyleToCache(className, style)
      renderer.cache[className] = true
    }

    return ` ${className}`
  }

  return renderer
}

export default function monolithic() {
  return useMonolithicRenderer
}
