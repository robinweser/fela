function friendlyPseudoClass(style) {
  Object.keys(style).forEach(property => {
    const value = style[property]
    if (value instanceof Object && !Array.isArray(value)) {
      const regex = new RegExp('^on([A-Z])')
      if (regex.test(property)) {
        const pseudo = property.replace(regex, (match, p1) => ':' + p1.toLowerCase())

        style[pseudo] = friendlyPseudoClass(value)
        delete style[property]
      }
    }
  })

  return style
}

export default () => friendlyPseudoClass
