export default function customProperty(properties) {
  return (pluginInterface) => {
    const { style, processStyle } = pluginInterface

    Object.keys(style).forEach(property => {
      const value = style[property]
      if (properties[property]) {
        Object.assign(style, properties[property](value))
        delete style[property]
      }

      if (value instanceof Object && !Array.isArray(value)) {
        style[property] = processStyle({
          ...pluginInterface,
          style: value
        })
      }
    })

    return style
  }
}
