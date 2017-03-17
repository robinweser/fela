/* @flow */
/* eslint-disable no-continue */
import cssifyDeclaration from 'css-in-js-utils/lib/cssifyDeclaration'

import cssifyMediaQueryRules from '../utils/cssifyMediaQueryRules'

import generateCombinedMediaQuery from '../utils/generateCombinedMediaQuery'
import generateCSSRule from '../utils/generateCSSRule'
import generateCSSSelector from '../utils/generateCSSSelector'

import isMediaQuery from '../utils/isMediaQuery'
import isNestedSelector from '../utils/isNestedSelector'
import isUndefinedValue from '../utils/isUndefinedValue'

import normalizeNestedProperty from '../utils/normalizeNestedProperty'

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
  _parseMonolithicRules: Function,
};

function useMonolithicRenderer(
  renderer: DOMRenderer
): DOMRenderer & MonoliticRenderer {
  renderer._parseMonolithicRules = (
    selector: string,
    styles: Object,
    mediaSelector: string = ''
  ): {
    rules: Array<string>,
    media: Array<{rules: Array<string>, media: string}>,
  } => {
    const decs = []
    const rules = []
    const media = []

    for (const key in styles) {
      const value = styles[key]
      const type = typeof value

      if (isUndefinedValue(value)) {
        continue
      } else if (type === 'number' || type === 'string') {
        decs.push(cssifyDeclaration(key, value))
        continue
      } else if (Array.isArray(value)) {
        value.forEach(val => decs.push(cssifyDeclaration(key, val)))
        continue
      } else if (isNestedSelector(key)) {
        renderer
          ._parseMonolithicRules(
            selector + normalizeNestedProperty(key),
            value,
            mediaSelector
          )
          .rules.forEach(r => rules.push(r))
        continue
      } else if (isMediaQuery(key)) {
        const mediaKey = generateCombinedMediaQuery(
          mediaSelector,
          key.slice(6).trim()
        )
        const mediaRules = renderer._parseMonolithicRules(
          selector,
          value,
          mediaKey
        )
        media.push({
          rules: mediaRules.rules,
          media: mediaKey
        })
        mediaRules.media.forEach(r => media.push(r))
        continue
      } else {
        renderer
          ._parseMonolithicRules(`${selector} ${key}`, value, mediaSelector)
          .rules.forEach(r => rules.push(r))
        continue
      }
    }

    rules.unshift(generateCSSRule(selector, decs.join(';')))

    return {
      rules,
      media
    }
  }

  renderer._renderStyleToClassNames = (style: Object): string => {
    if (!Object.keys(style).length) {
      return ''
    }

    const className = generateClassName(
      style,
      renderer.selectorPrefix || 'fela-'
    )
    const selector = generateCSSSelector(className)

    if (renderer.cache[className]) return ` ${className}`

    const { rules, media } = renderer._parseMonolithicRules(selector, style)
    const cssRules = rules.join('')

    if (!renderer.cache[className]) {
      renderer.cache[className] = ''
    }

    if (rules.length) {
      renderer.rules += cssRules
      renderer.cache[className] += cssRules

      renderer._emitChange({
        selector,
        declaration: cssRules,
        type: RULE_TYPE
      })
    }
    if (media.length) {
      media.forEach((r) => {
        const mediaKey = r.media
        const mediaRules = r.rules.join('')
        if (!renderer.mediaRules.hasOwnProperty(mediaKey)) {
          renderer.mediaRules[mediaKey] = ''
        }
        renderer.mediaRules[mediaKey] += mediaRules
        renderer.cache[className] += cssifyMediaQueryRules(
          mediaKey,
          mediaRules
        )

        renderer._emitChange({
          selector,
          declaration: mediaRules,
          media: mediaKey,
          type: RULE_TYPE
        })
      })
    }

    return ` ${className}`
  }

  return renderer
}

export default function monolithic() {
  return useMonolithicRenderer
}
