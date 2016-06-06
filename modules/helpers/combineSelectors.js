import deepAssign from 'deep-assign'

export default (...selectors) => {
  return props => {
    const style = { }

    selectors.forEach(selector => deepAssign(style, selector(props)))
    return style
  }
}
