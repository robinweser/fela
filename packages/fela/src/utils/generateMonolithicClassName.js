/* @flow  */
export default function generateMonolithicClassName(
  style: Object,
  prefix: string
): string {
  if (style.className) {
    const name = prefix + style.className
    delete style.className
    return name
  }

  const stringified = JSON.stringify(style)
  let val = 5381
  let i = stringified.length

  while (i) {
    val = (val * 33) ^ stringified.charCodeAt(--i)
  }

  return prefix + (val >>> 0).toString(36)
}
