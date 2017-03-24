/* @flow */
import cssifyMediaQueryRules from '../../utils/cssifyMediaQueryRules'

export default function renderToString(renderer: Object): string {
  let css = renderer.fontFaces + renderer.statics + renderer.keyframes + renderer.rules

  for (const media in renderer.mediaRules) {
    css += cssifyMediaQueryRules(media, renderer.mediaRules[media])
  }

  return css
}
