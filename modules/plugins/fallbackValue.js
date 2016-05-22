import camelToDashCase from '../utils/camelToDashCase'

export default function fallbackValue() {
  return (pluginInterface) => {
    const { styles, processStyles } = pluginInterface

    Object.keys(styles).forEach(property => {
      const value = styles[property]
      if (Array.isArray(value)) {
        styles[property] = value.join(';' + camelToDashCase(property) + ':')
      } else if (value instanceof Object) {
        styles[property] = processStyles({
          ...pluginInterface,
          styles: value
        })
      }
    })

    return styles
  }
}
