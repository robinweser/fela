/* @flow weak */
import warning from '../utils/warning'
import isUnitlessCSSProperty from 'unitless-css-property'

function addUnitIfNeeded(property, value, unit) {
  const valueType = typeof value
  if (valueType === 'number' || valueType === 'string' && value == parseFloat(value)) { // eslint-disable-line
    value += unit
  }

  return value
}

function addUnit(style, unit, propertyMap) {
  for (let property in style) {
    if (!isUnitlessCSSProperty(property)) {

      const value = style[property]
      const propertyUnit = propertyMap[property] || unit
      if (Array.isArray(value)) {
        style[property] = value.map(value => addUnitIfNeeded(property, value, propertyUnit))
      } else if (value instanceof Object) {
        style[property] = addUnit(value, unit, propertyMap)
      } else {
        style[property] = addUnitIfNeeded(property, value, propertyUnit)
      }
    }
  }

  return style
}

export default (unit = 'px', propertyMap = { }) => {
  warning(unit.match(/ch|em|ex|rem|vh|vw|vmin|vmax|px|cm|mm|in|pc|pt|mozmm|%/) !== null, 'You are using an invalid unit `' + unit + '`. Consider using one of the following ch, em, ex, rem, vh, vw, vmin, vmax, px, cm, mm, in, pc, pt, mozmm or %.')

  return style => addUnit(style, unit, propertyMap)
}
