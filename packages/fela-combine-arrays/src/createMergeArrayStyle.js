/* @flow */
import arrayReduce from 'fast-loops/lib/arrayReduce'
import objectReduce from 'fast-loops/lib/objectReduce'
import isPlainObject from 'isobject'

import arrayifyValue from './arrayifyValue'

export default function createMergeArrayStyle(mergeProps?: Array<string>) {
  return function mergeArrayStyle(
    base: Object,
    ...extendingStyles: Array<Object>
  ): Object {
    return arrayReduce(
      extendingStyles,
      (mergedStyle, style) =>
        objectReduce(
          style,
          (merged, value, property) => {
            const baseValue = merged[property]

            if (
              baseValue &&
              (!mergeProps || mergeProps.indexOf(property) !== -1)
            ) {
              merged[property] = [
                ...arrayifyValue(baseValue),
                ...arrayifyValue(value),
              ]
            } else if (isPlainObject(baseValue) && isPlainObject(value)) {
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
