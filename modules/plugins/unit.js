import warning from 'fbjs/lib/warning'
import isUnitlessCSSProperty from 'unitless-css-property'

function addUnitIfNeeded(property, value, unit) {
  const valueType = typeof value
  if (valueType === 'number' || valueType === 'string' && value == parseFloat(value)) { // eslint-disable-line
    value += unit
  }

  return value
}

function addUnit(style, unit) {
  Object.keys(style).forEach(property => {
    if (!isUnitlessCSSProperty(property)) {

      const value = style[property]
      if (Array.isArray(value)) {
        style[property] = value.map(value => addUnitIfNeeded(property, value, unit))
      } else if (value instanceof Object) {
        style[property] = addUnit(value, unit)
      } else {
        style[property] = addUnitIfNeeded(property, value, unit)
      }
    }
  })

  return style
}

export default (unit = 'px') => {
  warning(unit.match(/ch|em|ex|rem|vh|vw|vmin|vmax|px|cm|mm|in|pc|pt|mozmm|%/) !== null, 'You are using an invalid unit `' + unit + '`. Consider using one of the following ch, em, ex, rem, vh, vw, vmin, vmax, px, cm, mm, in, pc, pt, mozmm or %.')

  return style => addUnit(style, unit)
}
