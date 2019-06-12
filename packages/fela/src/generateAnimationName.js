/* @flow */
export default function generateAnimationName(id: number, prefix?: string = ''): string {
  return prefix + 'k' + id
}
