/* @flow */
export default function generateAnimationName(
  id: number,
  rendererId?: string = ''
): string {
  return `${rendererId}k${id}`
}
