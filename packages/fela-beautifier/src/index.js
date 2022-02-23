import cssbeautify from 'cssbeautify'
import { objectEach } from 'fast-loops'

function addBeautifier(renderer, options) {
  function beautify() {
    objectEach(renderer.nodes, ({ node }) => {
      const beautifiedContent = cssbeautify(node.textContent, options)

      if (node.textContent !== beautifiedContent) {
        node.textContent = beautifiedContent
      }
    })

    setTimeout(beautify, 200)
  }

  // Warning: We can only run that on devMode
  if (renderer.devMode) {
    beautify()
  }

  return renderer
}

const defaultOptions = {
  indent: '  ',
  openbrace: 'end-of-line',
  autosemicolon: false,
}

export default function beautifier(options = {}) {
  return (renderer) =>
    addBeautifier(renderer, {
      ...defaultOptions,
      ...options,
    })
}
