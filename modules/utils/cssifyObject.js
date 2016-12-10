/* @flow weak */
import generateCSSDeclaration from './generateCSSDeclaration'
import warning from './warning'


export default function cssifyObject(style) {
  let css = ''

  for (let property in style) {
    warning(typeof style[property] === 'string' || typeof style[property] === 'number', 'The invalid value `' + style[property] + '` has been used as `' + property + '`.')

    // prevents the semicolon after
    // the last rule declaration
    if (css) {
      css += ';'
    }

    css += generateCSSDeclaration(property, style[property])
  }

  return css
}
