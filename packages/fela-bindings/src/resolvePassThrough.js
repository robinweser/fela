/* @flow */
export default function resolvePassThrough(
  passThrough: Function | Array<string>,
  ruleProps: Object
): Array<string> {
  if (typeof passThrough === 'function') {
    return passThrough(ruleProps)
  }

  return passThrough
}
