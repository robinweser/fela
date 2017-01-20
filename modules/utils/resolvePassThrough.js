/* @flow weak */
export default function resolvePassThrough(passThrough, ruleProps) {
  if (passThrough instanceof Function) {
    return Object.keys(passThrough(ruleProps))
  }

  return passThrough
}
