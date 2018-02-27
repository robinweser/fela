/* @flow */
import type { DOMRenderer } from '../../../flowtypes/DOMRenderer'
import type { NativeRenderer } from '../../../flowtypes/NativeRenderer'

export default function resolveRule(
  rule: Object | Function,
  props?: Object = {},
  renderer?: DOMRenderer | NativeRenderer
): Object {
  if (rule instanceof Function) {
    return rule(props, renderer)
  }

  return rule
}
