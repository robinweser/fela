/* @flow */
import isPlainObject from 'isobject'

const regex = new RegExp('^on([A-Z])')
const pseudoElements = [
  'after',
  'before',
  'first-letter',
  'first-line',
  'selection',
  'backdrop',
  'placeholder',
  'marker',
  'spelling-error',
  'grammar-error',
]

function friendlyPseudoClass(style: Object): Object {
  for (const property in style) {
    const value = style[property]

    if (isPlainObject(value)) {
      const resolvedValue = friendlyPseudoClass(value)

      if (regex.test(property)) {
        const pseudo = property
          .replace(/([A-Z])/g, (match: string) => '-' + match.toLowerCase())
          .replace(
            /^on-(.*)/g,
            (match, p1: string) =>
              `${pseudoElements.includes(p1) ? '::' : ':'}${p1}`
          )

        style[pseudo] = resolvedValue
        delete style[property]
      } else {
        style[property] = resolvedValue
      }
    }
  }

  return style
}

export default () => friendlyPseudoClass
