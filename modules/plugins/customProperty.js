export default function customProperty(properties) {
  return (pluginInterface) => {
    const { styles, processStyles } = pluginInterface

    Object.keys(styles).forEach(property => {
      const value = styles[property]
      if (properties[property]) {
        Object.assign(styles, properties[property](value))
        delete styles[property]
      }

      if (value instanceof Object && !Array.isArray(value)) {
        styles[property] = processStyles({
          ...pluginInterface,
          styles: value
        })
      }
    })

    return styles
  }
}
