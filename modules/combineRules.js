import deepAssign from 'deep-assign'

export default function combineRules(...rules) {
  return props => rules.reduce((style, rule) => deepAssign(style, rule(props)), { })
}
