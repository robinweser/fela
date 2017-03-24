/* @flow */
import cssbeautify from 'cssbeautify'

import type DOMRenderer from '../../flowtypes/DOMRenderer'

function addBeautifier(renderer: DOMRenderer, options: Object): DOMRenderer {
  const existingRenderToString = renderer.renderToString.bind(renderer)

  renderer.renderToString = (): string => {
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

export default function beautifier(options: Object = {}) {
  return (renderer: DOMRenderer) =>
    addBeautifier(renderer, {
      ...defaultOptions,
      ...options
    })
}
