/* @flow weak */
import assign from './utils/assign'

export default function combineRules(...rules) {
  return props => {
    const style = { }

    for (let i = 0, len = rules.length; i < len; ++i) {
      assign(style, rules[i](props))
    }

    return style
  }
}
