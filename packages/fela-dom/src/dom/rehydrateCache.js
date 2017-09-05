/* @flow */
import camelCaseProperty from 'css-in-js-utils/lib/camelCaseProperty'

import { arrayEach, generateCSSSelector, RULE_TYPE } from 'fela-utils'

import type DOMRenderer from '../../../../flowtypes/DOMRenderer'

const DECL_REGEX = /.([^:{]+)(:[^{]+)?{([^}]+)}/g
const PROPERTY_VALUE_REGEX = /:(.+)/

export default function rehydrateCache(renderer: DOMRenderer): void {
  return arrayEach(document.querySelectorAll('[data-fela-type]'), node => {
    const type = node.getAttribute('data-fela-type') || ''
    const media = node.getAttribute('media') || ''
    const css = node.textContent

    // rehydration (WIP)
    // TODO: static, keyframe, font
    if (type === RULE_TYPE) {
      let decl

      // This excellent parsing implementation was originally taken from Styletron and modified to fit Fela
      // https://github.com/rtsao/styletron/blob/master/packages/styletron-client/src/index.js#L47
      /* eslint-disable no-unused-vars,no-cond-assign */
      while ((decl = DECL_REGEX.exec(css))) {
        // $FlowFixMe
        const [_, className, pseudo = '', declaration] = decl
        /* eslint-enable */
        const [property, value] = declaration.split(PROPERTY_VALUE_REGEX)

        renderer.getNextRuleIdentifier()

        const declarationReference =
          media + pseudo + camelCaseProperty(property) + value
        renderer.cache[declarationReference] = {
          type: RULE_TYPE,
          className,
          selector: generateCSSSelector(className, pseudo),
          declaration,
          media
        }
      }
    }
  })
}
