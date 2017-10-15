/* @flow */
import { isObject, arrayReduce, objectReduce } from 'fela-utils'

import arrayifyValue from './arrayifyValue'

export default function createMergeArrayStyle(mergeProps?: Array<string>) {
  return function mergeArrayStyle(
    base: Object,
    ...extendingStyles: Array<Object>
  ) {
    return arrayReduce(
      extendingStyles,
      (mergedStyle, style) =>
        objectReduce(
          style,
          (merged, value, property) => {
            const baseValue = merged[property]

            if (!mergeProps || mergeProps.indexOf(property) !== -1) {
              merged[property] = [
                ...arrayifyValue(baseValue),
                ...arrayifyValue(value)
              ]
            } else if (isObject(baseValue) && isObject(value)) {
              merged[property] = mergeArrayStyle({}, baseValue, value)
            } else {
              merged[property] = value
            }

            return merged
          },
          mergedStyle
        ),
      base
    )
  }
}
