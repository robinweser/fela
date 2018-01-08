/* @flow */
export default function generateCSSRule(
  selector: string,
  cssDeclaration: string
): string {
  return `${selector}{${cssDeclaration}}`
}
