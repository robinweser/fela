/* @flow  */
import generateUniqueHash from './generateUniqueHash'

export default function generateMonolithicClassName(
  style: Object,
  prefix: string = ''
): string {
  if (style.className) {
    const name = prefix + style.className
    delete style.className
    return name
  }

  const hashedName = generateUniqueHash(style)
  return `${prefix}${hashedName}`
}
