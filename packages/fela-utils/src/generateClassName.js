/* @flow  */
const chars = 'abcdefghijklmnopqrstuvwxyz'
const charLength = chars.length
const charsSpecial = '1234567890_-'
const charsSpecialLength = charsSpecial.length

export default function generateClassName(
  id: number,
  className: string = '',
  set: string = chars,
  length: number = charLength
): string {
  if (id <= length) {
    return className + set[id - 1]
  }

  // Bitwise floor as safari performs much faster https://jsperf.com/math-floor-vs-math-round-vs-parseint/55
  return generateClassName(
    (id / length) | 0,
    className + set[id % length],
    charsSpecial,
    charsSpecialLength
  )
}
