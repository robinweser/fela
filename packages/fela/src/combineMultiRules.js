/* @flow */
import objectReduce from 'fast-loops/lib/objectReduce'
import objectEach from 'fast-loops/lib/objectEach'
import combineRules from './combineRules'

type MultiRule = {
  [string]: Function | Object
}

export default function combineMultiRules(...multiRules: Array<MultiRule>): MultiRule {
  const aggregatedRules = objectReduce(
    multiRules,
    (aggregated, multiRule) => {
      objectEach(multiRule, (value, key) => {
        const rule =
          typeof value === 'function' ? value : () => value

        if (aggregated[key]) {
          aggregated[key].push(rule)
        } else {
          aggregated[key] = [rule]
        }
      })

      return aggregated
    },
    {}
  )

  return objectReduce(
    aggregatedRules,
    (multiRule, aggregatedRule, name) => ({
      ...multiRule,
      [name]: combineRules(...aggregatedRule)
    }),
    {}
  )
}
