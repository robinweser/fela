/* @flow */
import { isValidHTMLElement } from 'fela-utils'

import renderToString from './renderToString'

import type DOMRenderer from '../../../flowtypes/DOMRenderer'
import type DOMNode from '../../../flowtypes/DOMNode'

export default function renderToElement(
  renderer: DOMRenderer,
  mountNode: DOMNode
): Function {
  // mountNode must be a valid HTML element to be able
  // to set mountNode.textContent later on
  if (!isValidHTMLElement(mountNode)) {
    throw new Error(
      'You need to specify a valid element node (mountNode.nodeType = 1) to render into.'
    )
  }

  const css = renderToString(renderer)

  if (mountNode.textContent !== css) {
    // render currently rendered styles to the DOM once
    mountNode.textContent = css
  }

  return renderer.subscribe(() => {
    mountNode.textContent = renderToString(renderer)
  })
}
