import deepAssign from 'deep-assign'

export default function combineSelectors(...selectors) {
  return props => selectors.reduce((style, selector) => deepAssign(style, selector(props)), { })
}
