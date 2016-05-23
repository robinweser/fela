export default function friendlyPseudoClass() {
  return (pluginInterface) => {
    const { styles, processStyles } = pluginInterface

    Object.keys(styles).forEach(property => {
      const value = styles[property]
      if (value instanceof Object && !Array.isArray(value)) {
        const regex = new RegExp('^on([A-Z])')
        if (regex.test(property)) {
          const pseudo = property.replace(regex, (match, p1) => ':' + p1.toLowerCase())

          styles[pseudo] = processStyles({
            ...pluginInterface,
            styles: value
          })

          delete styles[property]
        }
      }
    })

    return styles
  }
}
