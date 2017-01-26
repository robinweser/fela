/* @flow */
export default function mapValueToMediaQuery(queryValueMap: Object = {}, mapper: Function) {
  const style = {}

  for (const query in queryValueMap) {
    style[query] = mapper(queryValueMap[query])
  }

  return style
}
