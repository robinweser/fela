/* @flow weak */
export default function cssifyMediaQueryRules(mediaQuery, mediaQueryRules) {
  return '@media ' + mediaQuery + '{' + mediaQueryRules + '}'
}
