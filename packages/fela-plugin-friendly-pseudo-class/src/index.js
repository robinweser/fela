import isPlainObject from 'isobject'

const FRIENDLY_PSEUDO_REGEX = /^on([A-Z])/
const UPPERCASE_REGEX = /([A-Z])/g
const ON_REGEX = /^on-(.*)/g

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

function friendlyPseudoClassPlugin(style) {
  for (const property in style) {
    const value = style[property]

    if (isPlainObject(value)) {
      const resolvedValue = friendlyPseudoClassPlugin(value)

      if (property.match(FRIENDLY_PSEUDO_REGEX) !== null) {
        const pseudo = property
          .replace(UPPERCASE_REGEX, (match) => '-' + match.toLowerCase())
          .replace(
            ON_REGEX,
            (match, p1) => `${pseudoElements.includes(p1) ? '::' : ':'}${p1}`
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

export default function friendlyPseudoClass() {
  return friendlyPseudoClassPlugin
}
