/* @flow */
import { RULE_TYPE, generateDeclarationReference } from 'fela-utils'

import generateCacheEntry from './generateCacheEntry'

// Escaping for RegExp taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')
}

export default function rehydrateRules(
  css: string,
  media: string = '',
  support?: string = '',
  cache?: Object = {},
  specificityPrefix?: string = ''
): Object {
  let decl
  const DECL_REGEX = new RegExp(
    `${escapeRegExp(
      specificityPrefix
    )}[.]([0-9a-z_-]+)([^{]+)?{([^:]+):([^}]+)}`,
    'gi'
  )

  // This excellent parsing implementation was originally taken from Styletron and modified to fit Fela
  // https://github.com/rtsao/styletron/blob/master/packages/styletron-client/src/index.js#L47
  /* eslint-disable no-unused-vars,no-cond-assign */
  while ((decl = DECL_REGEX.exec(css))) {
    // $FlowFixMe
    const [ruleSet, className, pseudo, property, value] = decl
    /* eslint-enable */

    const declarationReference = generateDeclarationReference(
      property,
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
