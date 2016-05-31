export default function friendlyPseudoClass() {
  return (pluginInterface) => {
    const { style, processStyle } = pluginInterface

    Object.keys(style).forEach(property => {
      const value = style[property]
      if (value instanceof Object && !Array.isArray(value)) {
        const regex = new RegExp('^on([A-Z])')
        if (regex.test(property)) {
          const pseudo = property.replace(regex, (match, p1) => ':' + p1.toLowerCase())

          style[pseudo] = processStyle({
            ...pluginInterface,
            style: value
          })

          delete style[property]
        }
      }
    })

    return style
  }
}
