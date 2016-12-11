/* @flow weak */
import createRenderer from '../createRenderer'
import render from '../dom/render'

function addFontRenderer(renderer, mountNode) {
  renderer.fontRenderer = createRenderer()

  // mount font styles into the mountNode
  if (mountNode) {
    render(renderer.fontRenderer, mountNode)
  }

  renderer.renderFont = (family, files, properties) => {
    return renderer.fontRenderer.renderFont(family, files, properties)
  }

  return renderer
}

export default mountNode => renderer => addFontRenderer(renderer, mountNode)
