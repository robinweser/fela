/* @flow weak */
import assignStyle from 'css-in-js-utils/lib/assignStyle'

export default function combineRules(...rules) {
  return (props) => {
    const style = {}

    for (let i = 0, len = rules.length; i < len; ++i) {
      assignStyle(style, rules[i](props))
    }

    return style
  }
}
