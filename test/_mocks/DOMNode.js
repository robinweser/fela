export default function DOMNode(type, name) {
  return {
    textContent: '',
    nodeType: type,
    nodeName: name,
    hasAttribute: function(attribute) {
      return this.hasOwnProperty(attribute)
    },
    setAttribute: function(attribute, value) {
      this[attribute] = value
    }
  }
}
