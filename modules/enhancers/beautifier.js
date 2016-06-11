import cssbeautify from 'cssbeautify'

const defaultOptions = {
  indent: '  ',
  openbrace: 'end-of-line',
  autosemicolon: false
}

export default (options = { }) => renderer => {
  // DOM Renderer
  if (renderer.hasOwnProperty('mountNode')) {
    renderer.subscribe(css => {
      renderer.mountNode.textContent = cssbeautify(css, {
        ...defaultOptions,
        ...options
      })
    })

    return renderer
  }

  // Server Renderer
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
