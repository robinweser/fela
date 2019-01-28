/* @flow */
export default function generateAnimationName(
  rendererId: string,
  id: number
): string {
  return `${rendererId}k${id}`
}
