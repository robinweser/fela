export default function createDOMInterface(renderer, node) {
  let isHydrating = false

  const DOMInterface = {
    /**
     * updates DOM node styles performantly
     *
     * @param {Function} node - DOM node
     * @param {Object} change - object describing the changes
     * @param {Object} renderer - the renderer which triggered the change
     */
    updateNode(change = { }) {
      // setting the hydration flag to prevent DOM updates will immediately
      // get unset as soon as the rehydration process is done
      if (change.type === 'hydrate') {
        isHydrating = !change.done
      }

      // only update DOM if the renderer is not hydrating at the moment
      if (!isHydrating) {
        // only use insertRule in production as browser devtools might have
        // weird behavior if used together with insertRule at runtime
        if (change.type === 'rule' && !change.media && process.env.NODE_ENV === 'production') {
          const sheet = node.sheet
          // directly append new rules before media rules
          sheet.insertRule(change.selector + '{' + change.css + '}', sheet.cssRules.length)
        } else {
          node.textContent = renderer.renderToString()
        }
      }
    }
  }

  return DOMInterface
}
