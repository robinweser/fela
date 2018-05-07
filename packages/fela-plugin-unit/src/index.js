/* @flow */
import isUnitlessProperty from 'css-in-js-utils/lib/isUnitlessProperty'
import isPlainObject from 'isobject'

function addUnitIfNeeded(
  property: string,
  value: any,
  propertyUnit: string
): any {
  const valueType = typeof value
  /* eslint-disable eqeqeq */
  if (
    (valueType === 'number' ||
      (valueType === 'string' && value == parseFloat(value))) &&
    value != 0
  ) {
    value += propertyUnit
  }
  /* eslint-enable */
  return value
}

function addUnit(
  style: Object,
  defaultUnit: string,
  propertyMap: Object
): Object {
  for (const property in style) {
    if (!isUnitlessProperty(property)) {
      const cssValue = style[property]
      const propertyUnit = propertyMap[property] || defaultUnit

      if (isPlainObject(cssValue)) {
        style[property] = addUnit(cssValue, defaultUnit, propertyMap)
      } else if (Array.isArray(cssValue)) {
        style[property] = cssValue.map(val =>
          addUnitIfNeeded(property, val, propertyUnit)
        )
      } else {
        style[property] = addUnitIfNeeded(property, cssValue, propertyUnit)
      }
    }
  }

  return style
}

export default function unit(
  defaultUnit: string = 'px',
  propertyMap: Object = {}
) {
  return (style: Object) => addUnit(style, defaultUnit, propertyMap)
}
