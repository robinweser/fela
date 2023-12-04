import { KEYFRAME_TYPE } from 'fela-utils'

const RE = /@(-webkit-|-moz-)?keyframes ([a-z_][a-z0-9-_]*)(\{.*?(?=}})}})/gi

export default function rehydrateKeyframes(css, cache = {}) {
  const matches = css.matchAll(RE)

  for (const match of matches) {
    const [keyframe, , animationName, reference] = match

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
