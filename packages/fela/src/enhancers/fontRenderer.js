/* @flow  */
import createRenderer from '../createRenderer'
import render from '../dom/render'

import type DOMRenderer from '../../flowtypes/DOMRenderer'
import type DOMNode from '../../flowtypes/DOMNode'

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
