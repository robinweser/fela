/* @flow */
export default function generateCSSRule(
  selector: string,
  cssDeclaration: string,
  support?: string = ''
): string {
  const cssRule = `${selector}{${cssDeclaration}}`

  if (support.length > 0) {
    return `@supports ${support}{${cssRule}}`
  }

  return cssRule
}
