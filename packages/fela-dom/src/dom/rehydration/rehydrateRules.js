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
      )}[.]([0-9a-z_-]+)(([.][0-9a-z_-]+){0,})([^{]+)?{([^:]+):([^}]+)}`,
      'gi'
    )
  }

  return regexMap[specificityPrefix]
}

function rehydrateClassList(classList, className) {
  if (classList) {
    const regex = new RegExp(`(([.]${className})+)?(.*)?`, '')

    const [match, repeated, selector, other = ''] = classList.match(regex)

    return [other, repeated ? repeated.length / selector.length + 1 : 1]
  }

  return ['', 1]
}

export default function rehydrateRules(
  css,
  media = '',
  support = '',
  cache = {},
  specificityPrefix = ''
) {
  let decl
  const DECL_REGEX = getRegex(specificityPrefix)

  // This excellent parsing implementation was originally taken from Styletron and modified to fit Fela
  // https://github.com/rtsao/styletron/blob/master/packages/styletron-client/src/index.js#L47
  /* eslint-disable no-unused-vars,no-cond-assign */
  while ((decl = DECL_REGEX.exec(css))) {
    const [ruleSet, className, classList, _, pseudo = '', property, value] =
      decl
    /* eslint-enable */

    const [classes, propertyPriority] = rehydrateClassList(classList, className)

    const declarationReference = generateDeclarationReference(
      // keep css custom properties as lower-cased props
      property.indexOf('--') === 0 ? property : camelCaseProperty(property),
      value,
      classes + pseudo,
      media,
      support
    )

    cache[declarationReference] = generateCacheEntry(
      RULE_TYPE,
      className,
      property,
      value,
      classes + pseudo,
      media,
      support,
      specificityPrefix,
      propertyPriority
    )
  }

  return cache
}
