import isUnitlessCSSProperty from 'unitless-css-property'

function addUnitIfNeeded(property, value, unit) {
  const valueType = typeof value
  if (valueType === 'number' || valueType === 'string' && value == parseFloat(value)) { // eslint-disable-line
    value += unit
  }

  return value
}

export default function unit(unit = 'px') {
  return (pluginInterface) => {
    const { styles, processStyles } = pluginInterface

    Object.keys(styles).forEach(property => {
      if (!isUnitlessCSSProperty(property)) {

        const value = styles[property]
        if (Array.isArray(value)) {
          styles[property] = value.map(value => addUnitIfNeeded(property, value, unit))
        } else if (value instanceof Object) {
          styles[property] = processStyles({
            ...pluginInterface,
            styles: value
          })
        } else {
          styles[property] = addUnitIfNeeded(property, value, unit)
        }
      }
    })

    return styles
  }
}
