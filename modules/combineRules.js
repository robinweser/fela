/* @flow weak */
import assignStyles from './utils/assignStyles'

export default function combineRules(...rules) {
  return (props) => {
    const style = {}

    for (let i = 0, len = rules.length; i < len; ++i) {
      assignStyles(style, rules[i](props))
    }

    return style
  }
}
