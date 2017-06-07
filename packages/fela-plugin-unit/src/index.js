/* @flow */
import isUnitlessProperty from 'css-in-js-utils/lib/isUnitlessProperty'

import { isObject, warning } from 'fela-utils'

function addUnitIfNeeded(
  property: string,
  value: any,
  propertyUnit: string
): any {
  const valueType = typeof value
  /* eslint-disable eqeqeq */
  if (
    valueType === 'number' ||
    (valueType === 'string' && value == parseFloat(value))
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

      if (isObject(cssValue)) {
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
  warning(
    defaultUnit.match(
      /ch|em|ex|rem|vh|vw|vmin|vmax|px|cm|mm|in|pc|pt|mozmm|%/
    ) !== null,
    `You are using an invalid unit "${defaultUnit}". Consider using one of the following ch, em, ex, rem, vh, vw, vmin, vmax, px, cm, mm, in, pc, pt, mozmm or %.`
  )

  return (style: Object) => addUnit(style, defaultUnit, propertyMap)
}
