/* @flow */
import reduce from 'lodash/reduce'

export default function resolveUsedProps(
  props: Array<string>,
  src: Object
): Array<string> {
  return reduce(
    src,
    (output, value, prop) => {
      if (props.indexOf(prop) === -1 && prop !== 'innerRef' && prop !== 'is') {
        output.push(prop)
      }

      return output
    },
    []
  )
}
