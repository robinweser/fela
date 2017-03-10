/* @flow weak */
export default function extractPassThroughProps(passThrough, ruleProps) {
  const output = {}

  for (let i = 0, len = passThrough.length; i < len; ++i) {
    const prop = passThrough[i]
    output[prop] = ruleProps[prop]
  }

  return output
}
