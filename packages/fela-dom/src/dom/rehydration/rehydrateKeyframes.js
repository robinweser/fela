import { KEYFRAME_TYPE, generateDeclarationReference } from 'fela-utils'

const RE = /@(-webkit-|-moz-)?keyframes ([a-z_][a-z0-9-_]*)(\{.*?(?=}})}})/gi

export default function rehydrateKeyframes(css: string, cache?: Object = {}) {
  let decl

  while ((decl = RE.exec(css))) {
    const [keyframe, prefix, animationName, reference] = decl

    if (!cache[reference]) {
      cache[reference] = {
        type: KEYFRAME_TYPE,
        keyframe,
        name: animationName,
      }
    } else {
      cache[reference].keyframe += keyframe
    }
  }

  return cache
}
