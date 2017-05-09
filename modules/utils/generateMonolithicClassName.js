/* @flow  */
export default function generateMonolithicClassName(
  id: number,
  className: string = ''
): string {
  if (id <= charLength) {
    return chars[id - 1] + className
  }

  // Bitwise floor as safari performs much faster https://jsperf.com/math-floor-vs-math-round-vs-parseint/55
  return generateClassName(
    id / charLength | 0,
    chars[id % charLength] + className
  )
}
