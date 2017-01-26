/* @flow weak */
export default function extractPassThroughProps(passThrough, ruleProps) {
  return passThrough.reduce(
    (output, prop) => {
      output[prop] = ruleProps[prop]
      return output
    },
    {}
  )
}
