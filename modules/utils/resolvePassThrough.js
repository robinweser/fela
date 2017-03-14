/* @flow weak */
export default function resolvePassThrough(passThrough, ruleProps) {
  if (typeof passThrough === 'function') {
    return Object.keys(passThrough(ruleProps))
  }

  return passThrough
}
