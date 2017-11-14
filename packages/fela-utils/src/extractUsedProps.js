export default function extractUsedProps(
  rule: Function,
  theme: Object = {}
): Array<string> {
  // if the browser doesn't support proxies
  // we simply return an empty props object
  // see https://github.com/rofrischmann/fela/issues/468
  if (typeof Proxy === 'undefined') {
    return {}
  }

  const handler = props => ({
    get(target, key) {
      if (typeof target[key] === 'object' && target[key] !== null) {
        props.push(key)
        return target[key]
      }
      props.push(key)
      return target[key]
    }
  })

  const usedProps = []
  const proxy = new Proxy({ theme }, handler(usedProps))
  rule(proxy)
  return usedProps
}
