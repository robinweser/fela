/* @flow */
import createDOMInterface from './DOMInterface'

import type DOMRenderer from '../../../flowtypes/DOMRenderer'
import type DOMNode from '../../../flowtypes/DOMNode'

export default function render(renderer: DOMRenderer): void {
  const updateInterface = createDOMInterface(renderer)
  renderer.subscribe(updateInterface)
}
