/* @flow */
import { RULE_TYPE } from 'fela-utils'

import generateCacheEntry from './generateCacheEntry'
import generateDeclarationReference from './generateDeclarationReference'

const DECL_REGEX = /[.]([0-9a-z_-]+)([^{]+)?{([^:]+):([^}]+)}/gi

export default function rehydrateRules(
  css: string,
  media: string = '',
  support?: string = '',
  cache?: Object = {}
): Object {
  let decl

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
      support
    )
  }

  return cache
}
