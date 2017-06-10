/* @flow */
import { RULE_TYPE, KEYFRAME_TYPE, FONT_TYPE, STATIC_TYPE } from 'fela-utils'

const sheetMap = {
  fontFaces: FONT_TYPE,
  statics: STATIC_TYPE,
  keyframes: KEYFRAME_TYPE,
  rules: RULE_TYPE
}
type Sheet = {
  css: string,
  type: RULE_TYPE | KEYFRAME_TYPE | FONT_TYPE | STATIC_TYPE,
  media?: string
}

export default function renderToSheetList(renderer: Object): Array<Sheet> {
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
    const mediaCSS = renderer.mediaRules[media]

    if (mediaCSS.length > 0) {
      sheetList.push({
        css: mediaCSS,
        type: RULE_TYPE,
        media
      })
    }
  }

  return sheetList
}
