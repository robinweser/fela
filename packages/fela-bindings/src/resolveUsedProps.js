/* @flow */
import objectReduce from 'fast-loops/lib/objectReduce'

export default function resolveUsedProps(
  props: Array<string>,
  src: Object
): Array<string> {
  return objectReduce(
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
