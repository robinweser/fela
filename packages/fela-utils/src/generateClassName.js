/* @flow  */
const chars = 'abcdefghijklmnopqrstuvwxyz'
const charLength = chars.length
const blackList = ['ad']

export default function generateClassName(
  id: number,
  className: string = ''
): string {
  if (id <= charLength) {
    return chars[id - 1] + className
  }

  // Bitwise floor as safari performs much faster https://jsperf.com/math-floor-vs-math-round-vs-parseint/55
  const generatedClassName = generateClassName(
    (id / charLength) | 0,
    chars[id % charLength] + className
  )

  if (blackList.indexOf(generatedClassName) > -1) {
    return generateClassName(id + 1, className)
  }

  return generatedClassName
}
