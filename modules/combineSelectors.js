import deepAssign from 'deep-assign'

export default function combineSelectors(...selectors) {
  return props => {
    const style = { }

    selectors.forEach(selector => deepAssign(style, selector(props)))
    return style
  }
}
