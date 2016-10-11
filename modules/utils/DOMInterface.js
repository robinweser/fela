// this counter is used to cache the amount of @media rules
// rendered using insertRule since the last full rerender with textContent
// using the counter enables to insert rules and @media rules separately
// which helps to ensure correct order and prevents rule order issue
let mediaRules = 0

// this utility contains useful DOM interaction methods
// they are used to render styles on client side
export default {

  /**
   * updates DOM node styles performantly
   *
   * @param {Function} node - DOM node
   * @param {Object} change - object describing the changes
   * @param {Object} renderer - the renderer which triggered the change
   */
  updateNode(node, change, renderer) {
    // only use insertRule in production as browser devtools might have
    // weird behavior if used together with insertRule at runtime
    if (change.type === 'rule' && process.env.NODE_ENV === 'production') {
      const { selector, style, css, media } = change
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
    } else {
      // rules that cannot be dynamically added with insertRule
      // which are @font-face, @keyframes and static string assets
      // need a full rerender to be applied correctly
      node.textContent = renderer.renderToString()
      // the @media rules counter gets reset as the
      // full rerender also includes all @media rules
      mediaRules = 0
    }
  }
}
