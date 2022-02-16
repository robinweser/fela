import { objectReduce } from 'fast-loops'

export default function resolveUsedProps(props, src) {
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
