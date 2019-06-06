/* @flow */
import { expandWithMerge, expand } from 'inline-style-expand-shorthand'

function expandShorthand(style: Object, shouldMerge: boolean): Object {
  if (shouldMerge) {
    return expandWithMerge(style)
  }

  return expand(style)
}

export default function resolveShorthands(merge: boolean = false) {
  return (style: Object) => expandShorthand(style, merge)
}
