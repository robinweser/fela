import objectReduce from './objectReduce'

export default function resolveUsedProps(props: Array<string>, src: Object) {
  return objectReduce(
    src,
    (output, value, key) => {
      if (props.indexOf(key) === -1) output.push(key)
      return output
    },
    []
  ).filter(prop => prop !== 'innerRef' && prop !== 'is')
}
