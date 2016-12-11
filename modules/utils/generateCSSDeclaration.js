/* @flow weak */
import hyphenateStyleName from 'hyphenate-style-name'

export default function generateCSSDeclaration(property, value) {
  return hyphenateStyleName(property) + ':' + value
}
