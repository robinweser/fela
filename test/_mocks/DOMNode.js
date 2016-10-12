export default function DOMNode() {
  let cssRules = [ ]

  return {
    textContent: '',
    nodeType: 1,
    nodeName: 'STYLE',
    hasAttribute: function(attribute) {
      return this.hasOwnProperty(attribute)
    },
    setAttribute: function(attribute, value) {
      this[attribute] = value
    },
    sheet: {
      cssRules: cssRules,
      insertRule: (rule, id) => cssRules.splice(id, 0, rule)
    }
  }
}
