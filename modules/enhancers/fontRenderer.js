import { createRenderer, render } from 'fela'

/**
 * adds a special renderer only used for font rendering
 * to prevent flickering on changes
 *
 * @param {Object} renderer - renderer which gets enhanced
 * @param {DOMElement} mountNode - stylesheet to render fonts into
 * @return {Object} enhanced renderer
 */
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
