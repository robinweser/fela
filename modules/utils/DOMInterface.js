let mediaRules = 0

export default {

  /**
   * updates DOM node styles performantly
   *
   * @param {Function} node - DOM node
   * @param {Object} change - object describing the changes
   * @param {Object} renderer - the renderer which triggered the change
   */
  updateNode(node, change, renderer) {
    if (change.type === 'rule' && process.env.NODE_ENV === 'production') {
      const { selector, style, css, media } = change
      const cssRule = selector + '{' + style + '}'

      const sheet = node.sheet
      const ruleLength = sheet.cssRules.length

      if (media && media.length > 0) {
        sheet.insertRule('@media ' + media + '{' + cssRule + '}', ruleLength - mediaRules)
        mediaRules += 1
      } else {
        sheet.insertRule(cssRule, ruleLength)
      }
    } else {
      node.textContent = renderer.renderToString()
      mediaRules = 0
    }
  }
}
