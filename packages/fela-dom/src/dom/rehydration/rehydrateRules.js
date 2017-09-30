/* @flow */
import camelCaseProperty from 'css-in-js-utils/lib/camelCaseProperty'
import { generateCSSSelector, RULE_TYPE } from 'fela-utils'

const DECL_REGEX = /.([^:{]+)(:[^{]+)?{([^}]+)}/g
const PROPERTY_VALUE_REGEX = /:(.+)/

export default function rehydrateRules(
  cache: Object,
  css: string,
  media: string = '',
  support: string = ''
) {
  let decl

  // This excellent parsing implementation was originally taken from Styletron and modified to fit Fela
  // https://github.com/rtsao/styletron/blob/master/packages/styletron-client/src/index.js#L47
  /* eslint-disable no-unused-vars,no-cond-assign */
  while ((decl = DECL_REGEX.exec(css))) {
    // $FlowFixMe
    const [ruleSet, className, pseudo = '', declaration] = decl
    /* eslint-enable */
    const [property, value] = declaration.split(PROPERTY_VALUE_REGEX)

    const declarationReference =
      support + media + pseudo + camelCaseProperty(property) + value
    cache[declarationReference] = {
      type: RULE_TYPE,
      className,
      selector: generateCSSSelector(className, pseudo),
      declaration,
      media,
      support
    }
  }
}
