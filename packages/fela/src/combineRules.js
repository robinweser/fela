/* @flow */
import assignStyle from 'css-in-js-utils/lib/assignStyle'

import arrayReduce from './utils/arrayReduce'

export default function combineRules(...rules: Array<Function>): Function {
  return (props: Object): Object =>
    arrayReduce(rules, (style, rule) => assignStyle(style, rule(props)), {})
}
