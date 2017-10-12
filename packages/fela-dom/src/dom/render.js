/* @flow */
import createDOMSubscription from './createDOMSubscription'
import connectDOMNodes from './connectDOMNodes'

import type DOMRenderer from '../../../../flowtypes/DOMRenderer'

export default function render(renderer: DOMRenderer): void {
  if (process.env.NODE_ENV !== 'production' && renderer.updateSubscription) {
    console.warn(
      'The renderer has already been rendered to the DOM.' +
        'It listens to changes and automatically updates the StyleSheets.' +
        'You should not call render() twice.'
    )
  }

  if (!renderer.updateSubscription) {
    connectDOMNodes(renderer)

    renderer.updateSubscription = createDOMSubscription(renderer.nodes)
    renderer.subscribe(renderer.updateSubscription)
  }
}
