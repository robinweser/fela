/* @flow */
import {
  createStyleTagMarkup,
  RULE_TYPE,
  KEYFRAME_TYPE,
  FONT_TYPE,
  STATIC_TYPE
} from 'fela-utils'

const sheetMap = {
  fontFaces: FONT_TYPE,
  statics: STATIC_TYPE,
  keyframes: KEYFRAME_TYPE,
  rules: RULE_TYPE
}

export default function renderToMarkup(renderer: Object): string {
  let markup = ''

  for (const style in sheetMap) {
    if (renderer[style].length > 0) {
      markup += createStyleTagMarkup(renderer[style], sheetMap[style])
    }
  }

  for (const media in renderer.mediaRules) {
    const mediaCSS = renderer.mediaRules[media]

    if (mediaCSS.length > 0) {
      markup += createStyleTagMarkup(mediaCSS, RULE_TYPE, media)
    }
  }

  return markup
}
