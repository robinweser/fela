import assign from './utils/assign'

export default function combineRules(...rules) {
  return props => rules.reduce((style, rule) => assign(style, rule(props)), { })
}
