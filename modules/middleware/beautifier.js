import cssbeautify from 'cssbeautify'

const defaultOptions = {
  indent: '  ',
  openbrace: 'end-of-line',
  autosemicolon: false
}

export default (options = { }) => {
  return (renderer) => {
    // DOM Renderer
    if (renderer.hasOwnProperty('node')) {
      var css = ''
      renderer.stylesheet.subscribe(newCSS => {
        css += newCSS
        renderer.node.textContent = cssbeautify(css, {
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
}
