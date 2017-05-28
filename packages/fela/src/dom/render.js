/* @flow */
import createDOMInterface from './DOMInterface'
import renderToElement from '../tools/renderToElement'

import type DOMRenderer from '../../../../flowtypes/DOMRenderer'
import type DOMNode from '../../../../flowtypes/DOMNode'

let warnDeprecated = false

export default function render(
  renderer: DOMRenderer,
  mountNode: DOMNode
): void {
  // legacy support for single stylesheets
  // will be removed soon
  if (mountNode) {
    if (!warnDeprecated) {
      // TODO: warn
      warnDeprecated = true
    }

    renderToElement(renderer, mountNode)
  } else {
    const updateInterface = createDOMInterface(renderer)
    renderer.subscribe(updateInterface)
  }
}
