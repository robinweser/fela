/* @flow weak */
export default function cssifyMediaQueryRules(mediaQuery, mediaQueryRules) {
  if (mediaQueryRules) {
    return `@media ${mediaQuery}{${mediaQueryRules}}`
  }

  return ''
}
