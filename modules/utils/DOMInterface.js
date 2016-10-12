export default function createDOMInterface(renderer, node) {
  // this counter is used to cache the amount of @media rules
  // rendered using insertRule since the last full rerender with textContent
  // using the counter enables to insert rules and @media rules separately
  // which helps to ensure correct order and prevents rule order issue
  let mediaRules = 0
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
        return true
      }

      // only update DOM if the renderer is not hydrating at the moment
      if (!isHydrating) {
        switch (change.type) {
          case 'rule':
            // only use insertRule in production as browser devtools might have
            // weird behavior if used together with insertRule at runtime
            if (process.env.NODE_ENV !== 'production') {
              node.textContent = renderer.renderToString()
              // the @media rules counter gets reset as the
              // full rerender also includes all @media rules
              mediaRules = 0
            } else {
              const { selector, style, media } = change
              const cssRule = selector + '{' + style + '}'

              const sheet = node.sheet
              const ruleLength = sheet.cssRules.length

              if (media && media.length > 0) {
                // insert @media rules after basic rules, newest first
                sheet.insertRule('@media ' + media + '{' + cssRule + '}', ruleLength - mediaRules)
                mediaRules += 1
              } else {
                // directly append new rules before everything else
                sheet.insertRule(cssRule, 0)
              }
            }
            break
          case 'static':
            // rules that cannot be dynamically added with insertRule
            // which are @font-face, @keyframes and static string assets
            // need to use textContent to apply styles
            node.textContent = change.css
            mediaRules = 0
            break
        }
      }
    }
  }

  return DOMInterface
}
