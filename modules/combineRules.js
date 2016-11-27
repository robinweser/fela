/* @flow weak */
import assign from './utils/assign'

export default function combineRules(...rules) {
  return function combined(props) {
    return rules.reduce((style, rule) => assign(style, rule(props)), { })
  }
}
