/* @flow  */
import { createRenderer } from 'fela'
import { render } from 'fela-dom'

import deprecate from './deprecate'

import type DOMRenderer from '../../../flowtypes/DOMRenderer'
import type DOMNode from '../../../flowtypes/DOMNode'

deprecate(`The Font Renderer Enhancer (fela-font-renderer) is deprecated, please remove it from your Fela configuration.
Font Renderering was heavily improved within Fela making this package obsolete nowadays. See http://fela.js.org/docs/basics/Renderer.html#renderfont`)

function addFontRenderer(
  renderer: DOMRenderer,
  mountNode: DOMNode
): DOMRenderer {
  renderer.fontRenderer = createRenderer()

  // mount font styles into the mountNode
  if (mountNode) {
    render(renderer.fontRenderer, mountNode)
  }

  renderer.renderFont = (
    family: string,
    files: Array<string>,
    properties: Object
  ): string => renderer.fontRenderer.renderFont(family, files, properties)

  return renderer
}

export default function fontRenderer(mountNode: DOMNode) {
  return (renderer: DOMRenderer) => addFontRenderer(renderer, mountNode)
}
