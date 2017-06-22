export default function resolveUsedProps(props: Array<string>, src: Object) {
  const output = []
  for(let key in src) {
    if(props.indexOf(key) === -1)
      output.push(key)
  }
  return output
}