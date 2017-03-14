/* @flow */
import assignStyle from 'css-in-js-utils/lib/assignStyle'
import reduce from 'lodash/reduce'

export default function combineRules(...rules: Array<Function>): Function {
  return (props: Object): Object =>
    reduce(rules, (style, rule) => assignStyle(style, rule(props)), {})
}
