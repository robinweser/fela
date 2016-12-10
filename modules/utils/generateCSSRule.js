export default function generateCSSRule(selector, cssDeclaration) {
  return selector + '{' + cssDeclaration + '}'
}
