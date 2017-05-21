/* @flow */
import createDOMInterface from './DOMInterface'

import type DOMRenderer from '../../../../flowtypes/DOMRenderer'

export default function render(renderer: DOMRenderer): void {
  const updateInterface = createDOMInterface(renderer)
  renderer.subscribe(updateInterface)
}
