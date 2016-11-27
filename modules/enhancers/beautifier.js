/* @flow weak */
import cssbeautify from 'cssbeautify'

/**
 * beautifies CSS output of renderToString
 *
 * @param {Object} renderer - renderer which gets enhanced
 * @param {Object} options - beautifier options
 * @return {Object} enhanced renderer
 */
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
export default (options = { }) => renderer => addBeautifier(renderer, {
  ...defaultOptions,
  ...options
})
