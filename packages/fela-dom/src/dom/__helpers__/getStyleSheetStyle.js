import { RULE_TYPE } from '../../../../fela-utils/src/styleTypes'

export default function getStyleSheetStyle(node) {
  const { media, sheet, textContent } = node

  const type = node.getAttribute('data-fela-type')

  if (type !== RULE_TYPE) {
    return { _type: type, style: textContent }
  }

  let rules = {}

  for (var i = 0; i < sheet.cssRules.length; ++i) {
    const rule = sheet.cssRules[i]
    const { selectorText, style } = rule
    const key = sheet.cssRules.indexOf(rule) + '_' + selectorText
    rules[key] = {}

    for (var j = 0; j < style.length; ++j) {
      const property = style[j]
      rules[key][property] = style[property]
    }
  }

  return { _type: type, _media: media, style: rules }
}
