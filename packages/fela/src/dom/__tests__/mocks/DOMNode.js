export default function DOMNode() {
  const cssRules = []

  return {
    textContent: '',
    nodeType: 1,
    nodeName: 'STYLE',
    sheet: {
      cssRules,
      insertRule: (rule, id) => cssRules.splice(id, 0, rule)
    }
  }
}
