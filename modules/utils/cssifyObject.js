/* @flow weak */
import generateCSSDeclaration from './generateCSSDeclaration'

export default function cssifyObject(style) {
  let css = ''

  for (const property in style) {
    if (typeof style[property] !== 'string' && typeof style[property] !== 'number') {
      continue
    }

    // prevents the semicolon after
    // the last rule declaration
    if (css) {
      css += ';'
    }

    css += generateCSSDeclaration(property, style[property])
  }

  return css
}
