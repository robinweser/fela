/* @flow weak */
import hyphenateStyleName from 'hyphenate-style-name'

import warning from './warning'

export default function generateCSSDeclaration(property, value) {
  return hyphenateStyleName(property) + ':' + value
}
