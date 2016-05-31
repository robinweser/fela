import hypenateStyleName from 'hyphenate-style-name'

export default function fallbackValue() {
  return (pluginInterface) => {
    const { style, processStyle } = pluginInterface

    Object.keys(style).forEach(property => {
      const value = style[property]
      if (Array.isArray(value)) {
        style[property] = value.join(';' + hypenateStyleName(property) + ':')
      } else if (value instanceof Object) {
        style[property] = processStyle({
          ...pluginInterface,
          style: value
        })
      }
    })

    return style
  }
}
