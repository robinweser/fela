import { arrayReduce } from 'fast-loops'

export default function extractPassThroughProps(passThrough, ruleProps) {
  return arrayReduce(
    passThrough,
    (output, property) => {
      if (ruleProps.hasOwnProperty(property)) {
        output[property] = ruleProps[property]
      }

      return output
    },
    {}
  )
}
