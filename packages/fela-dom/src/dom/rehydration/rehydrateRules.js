/* @flow */
import { RULE_TYPE, generateDeclarationReference } from 'fela-utils'
import { camelCaseProperty } from 'css-in-js-utils'

import generateCacheEntry from './generateCacheEntry'

// Escaping for RegExp taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')
}

// we reuse regexes for improved performance
const regexMap = {}
function getRegex(specificityPrefix) {
  if (!regexMap[specificityPrefix]) {
    regexMap[specificityPrefix] = new RegExp(
      `${escapeRegExp(
        specificityPrefix
      )}[.]([\w-]+)([.][\w-]+){0,}([^{]+)?{([^:]+):([^}]+)}`,
      'gi'
    )
  }

  return regexMap[specificityPrefix]
}

export default function rehydrateRules(
  css: string,
  media: string = '',
  support?: string = '',
  cache?: Object = {},
  specificityPrefix?: string = ''
): Object {
  let decl
  const DECL_REGEX = getRegex(specificityPrefix)

  // This excellent parsing implementation was originally taken from Styletron and modified to fit Fela
  // https://github.com/rtsao/styletron/blob/master/packages/styletron-client/src/index.js#L47
  /* eslint-disable no-unused-vars,no-cond-assign */
  while ((decl = DECL_REGEX.exec(css))) {
    // $FlowFixMe
    const [ruleSet, className, _, pseudo, property, value] = decl
    /* eslint-enable */

    const declarationReference = generateDeclarationReference(
      camelCaseProperty(property),
      value,
      pseudo,
      media,
      support
    )

    cache[declarationReference] = generateCacheEntry(
      RULE_TYPE,
      className,
      property,
      value,
      pseudo,
      media,
      support,
      specificityPrefix
    )
  }

  return cache
}
