/* @flow  */
import reduce from 'lodash/reduce'

export default function extractPassThroughProps(
  passThrough: Array<string>,
  ruleProps: Object
): Object {
  return reduce(
    passThrough,
    (output, property) => {
      if (ruleProps.hasOwnProperty(property)) {
        output[property] = ruleProps[property]
      }

      return output
    },
    {}
  )
}
