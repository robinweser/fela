/* @flow */
import assignStyle from 'css-in-js-utils/lib/assignStyle'
import arrayReduce from 'fast-loops/lib/arrayReduce'

export default function combineRules(...rules: Array<Function>): Function {
  return (props, renderer) =>
    arrayReduce(
      rules,
      (style, rule) => assignStyle(style, rule(props, renderer)),
      {}
    )
}
