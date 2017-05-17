/* @flow  */
export default function cssifyMediaQueryRules(
  mediaQuery: string,
  mediaQueryRules?: string
): string {
  if (mediaQueryRules) {
    return `@media ${mediaQuery}{${mediaQueryRules}}`
  }

  return ''
}
