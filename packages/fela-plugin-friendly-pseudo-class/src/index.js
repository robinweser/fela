/* @flow */
function isPlainObject(obj: any): boolean {
  return typeof obj === 'object' && !Array.isArray(obj)
}

const regex = new RegExp('^on([A-Z])')

function friendlyPseudoClass(style: Object): Object {
  for (const property in style) {
    const value = style[property]

    if (isPlainObject(value)) {
      const resolvedValue = friendlyPseudoClass(value)

      if (regex.test(property)) {
        const pseudo = property.replace(
          regex,
          (match, p1) => `:${p1.toLowerCase()}`
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
