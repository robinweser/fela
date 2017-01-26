/* @flow weak */
import cssbeautify from 'cssbeautify'

function addBeautifier(renderer, options) {
  const existingRenderToString = renderer.renderToString.bind(renderer)

  renderer.renderToString = () => {
    const css = existingRenderToString()
    return cssbeautify(css, options)
  }

  return renderer
}

const defaultOptions = {
  indent: '  ',
  openbrace: 'end-of-line',
  autosemicolon: false
}
export default (options = {}) =>
  renderer => addBeautifier(renderer, {
    ...defaultOptions,
    ...options
  })
