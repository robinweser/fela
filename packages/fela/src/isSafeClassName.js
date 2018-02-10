/* @flow */
export default function isSafeClassName(className: string): boolean {
  return className.indexOf('ad') === -1
}
