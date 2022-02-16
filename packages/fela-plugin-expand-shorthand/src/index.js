import { expandWithMerge, expand } from 'inline-style-expand-shorthand'

function expandShorthand(style, shouldMerge) {
  if (shouldMerge) {
    return expandWithMerge(style)
  }

  return expand(style)
}

export default function resolveShorthands(merge = false) {
  return (style) => expandShorthand(style, merge)
}
