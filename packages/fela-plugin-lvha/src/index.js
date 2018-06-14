/* @flow */
import arrayEach from 'fast-loops/lib/arrayEach'

import deprecate from './deprecate'

deprecate(`The LVHA plugin (fela-plugin-lvha) is deprecated, please remove it from your Fela configuration.
It is obsolete as sorting is now handled by the renderer itself. See https://github.com/rofrischmann/fela/pull/573`)

const precedence = {
  ':link': 0,
  ':visited': 1,
  ':hover': 2,
  ':focus': 3,
  ':active': 4,
}

const pseudoClasses = Object.keys(precedence)

function orderLVHA(style: Object): Object {
  const pseudoList = []

  for (const property in style) {
    if (precedence.hasOwnProperty(property)) {
      pseudoList[precedence[property]] = style[property]
      delete style[property]
    }
  }

  arrayEach(pseudoList, (pseudoStyle, index) => {
    if (pseudoStyle) {
      style[pseudoClasses[index]] = pseudoStyle
    }
  })

  return style
}

export default () => orderLVHA
