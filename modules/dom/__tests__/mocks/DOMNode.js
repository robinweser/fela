export default function DOMNode() {
  const cssRules = []

  return {
    textContent: '',
    nodeType: 1,
    nodeName: 'STYLE',
    hasAttribute(attribute) {
      return this.hasOwnProperty(attribute)
    },
    setAttribute(attribute, value) {
      this[attribute] = value
    },
    sheet: {
      cssRules,
      insertRule: (rule, id) => cssRules.splice(id, 0, rule)
    }
  }
}
