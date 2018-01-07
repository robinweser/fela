/* @flow */
import arrayEach from 'fast-loops/lib/arrayEach'

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
