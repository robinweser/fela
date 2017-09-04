/* @flow */
import camelCaseProperty from 'css-in-js-utils/lib/camelCaseProperty'

import arrayReduce from './arrayReduce'
import generateCSSSelector from './generateCSSSelector'

import { RULE_TYPE } from './styleTypes'

import type DOMNode from '../../../flowtypes/DOMNode'
import type DOMRenderer from '../../../flowtypes/DOMRenderer'

const DECL_REGEX = /.([^:{]+)(:[^{]+)?{([^}]+)}/g
const PROPERTY_VALUE_REGEX = /:(.+)/

export default function reflushStyleNodes(renderer: DOMRenderer): void {
  return arrayReduce(
    document.querySelectorAll('[data-fela-type]'),
    (styleNodes, node) => {
      const type = node.getAttribute('data-fela-type') || ''
      const media = node.getAttribute('media') || ''
      const css = node.textContent

      // rehydration (WIP)
      // TODO: static, keyframe, font
      if (type === RULE_TYPE) {
        let decl

        // This excellent parsing implementation was originally taken from Styletron and modified to fit Fela
        // https://github.com/rtsao/styletron/blob/master/packages/styletron-client/src/index.js#L47
        while ((decl = DECL_REGEX.exec(css))) {
          const [_, className, pseudo = '', declaration] = decl
          const [property, value] = declaration.split(PROPERTY_VALUE_REGEX)

          renderer.getNextRuleIdentifier()
          const declarationReference = media + pseudo + camelCaseProperty(property) + value

          renderer.cache[declarationReference] = {
            type: RULE_TYPE,
            className,
            selector: generateCSSSelector(className, pseudo),
            declaration,
            media
          }
        }
      }

      styleNodes[type + media] = node
      return styleNodes
    },
    {}
  )
}
