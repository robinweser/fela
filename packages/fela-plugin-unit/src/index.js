/* @flow */
import defaultIsUnitlessProperty from 'css-in-js-utils/lib/isUnitlessProperty'
import isPlainObject from 'isobject'

function addUnitIfNeeded(value: any, propertyUnit: string): any {
  const valueType = typeof value
  /* eslint-disable eqeqeq */
  if (
    (valueType === 'number' ||
      (valueType === 'string' && value == parseFloat(value))) &&
    value != 0
  ) {
    return value + propertyUnit
  }
  /* eslint-enable */
  return value
}

function addUnit(
  style: Object,
  defaultUnit: string,
  propertyMap: Object,
  isUnitlessProperty: Function
): Object {
  for (const property in style) {
    if (!isUnitlessProperty(property)) {
      const cssValue = style[property]
      const propertyUnit = propertyMap[property] || defaultUnit

      if (isPlainObject(cssValue)) {
        style[property] = addUnit(
          cssValue,
          defaultUnit,
          propertyMap,
          isUnitlessProperty
        )
      } else if (Array.isArray(cssValue)) {
        style[property] = cssValue.map((val) =>
          addUnitIfNeeded(val, propertyUnit)
        )
      } else {
        style[property] = addUnitIfNeeded(cssValue, propertyUnit)
      }
    }
  }

  return style
}

function createOptimized(defaultUnit, propertyMap, isUnitlessProperty) {
  return (props) => {
    if (!isUnitlessProperty(props.property)) {
      const valueType = typeof props.value
      /* eslint-disable eqeqeq */
      if (
        (valueType === 'number' ||
          (valueType === 'string' && props.value == parseFloat(props.value))) &&
        props.value != 0
      ) {
        const unit = propertyMap[props.property] || defaultUnit
        props.value += unit
      }

      // handle arrays
      if (Array.isArray(props.value)) {
        const propertyUnit = propertyMap[props.property] || defaultUnit

        props.value = props.value.map((value) =>
          addUnitIfNeeded(value, propertyUnit)
        )
      }
    }

    return props
  }
}

export default function unit(
  defaultUnit: string = 'px',
  propertyMap: Object = {},
  isUnitlessProperty: Function = defaultIsUnitlessProperty
) {
  const plugin = (style: Object) =>
    addUnit(style, defaultUnit, propertyMap, isUnitlessProperty)

  plugin.optimized = createOptimized(
    defaultUnit,
    propertyMap,
    isUnitlessProperty
  )

  return plugin
}
