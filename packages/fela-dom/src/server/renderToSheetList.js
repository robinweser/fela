/* @flow */
import { RULE_TYPE, KEYFRAME_TYPE, FONT_TYPE, STATIC_TYPE } from 'fela-utils'

const sheetMap = {
  fontFaces: FONT_TYPE,
  statics: STATIC_TYPE,
  keyframes: KEYFRAME_TYPE,
  rules: RULE_TYPE
}

export default function renderToSheetList(renderer: Object): string {
  const sheetList = []

  for (const style in sheetMap) {
    if (renderer[style].length > 0) {
      sheetList.push({
        css: renderer[style],
        type: sheetMap[style]
      })
    }
  }

  for (const media in renderer.mediaRules) {
    if (mediaCSS.length > 0) {
      sheetList.push({
        css: renderer.mediaRules[media],
        type: RULE_TYPE,
        media
      })
    }
  }

  return sheetList
}
