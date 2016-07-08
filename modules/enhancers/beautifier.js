import cssbeautify from 'cssbeautify'

const defaultOptions = {
  indent: '  ',
  openbrace: 'end-of-line',
  autosemicolon: false
}

function beautifier(renderer) {
  const existingRenderToString = renderer.renderToString.bind(renderer)

  renderer.renderToString = () => {
    const css = existingRenderToString()
    return cssbeautify(css, {
      ...defaultOptions,
      ...options
    })
  }

  return renderer
}

export default options => beautifier
