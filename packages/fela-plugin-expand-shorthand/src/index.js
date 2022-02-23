import { expandWithMerge, expand } from 'inline-style-expand-shorthand'

function resolveShorthands(style, shouldMerge) {
  if (shouldMerge) {
    return expandWithMerge(style)
  }

  return expand(style)
}

export default function expandShorthand(merge = false) {
  return function expandShorthandPlugin(style) {
    return resolveShorthands(style, merge)
  }
}
