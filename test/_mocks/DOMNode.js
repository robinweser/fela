export default function DOMNode() {
  return {
    textContent: '',
    nodeType: 1,
    nodeName: 'STYLE',
    hasAttribute: function(attribute) {
      return this.hasOwnProperty(attribute)
    },
    setAttribute: function(attribute, value) {
      this[attribute] = value
    }
  }
}
