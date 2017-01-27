/* @flow */
export default function mapValueToMediaQuery(queryValueMap: Object = {}, mapper: Function | string): Object {
  const style = {}

  for (const query in queryValueMap) {
    if (typeof mapper === 'string') {
      style[query] = { [mapper]: queryValueMap[query] }
    } else {
      style[query] = mapper(queryValueMap[query])
    }
  }

  return style
}
