export default function extractUsedProps(rule: Function): Array<string> {
  const handler = props => {
    return {
      get(target, key) {
        if (typeof target[key] === 'object' && target[key] !== null) {
          props.push(key)
          return target[key]
        }
        props.push(key)
        return target[key]
      }
    }
  }

  const usedProps = []
  const proxy = new Proxy({ theme: {} }, handler(usedProps))
  rule(proxy)
  return usedProps
}
