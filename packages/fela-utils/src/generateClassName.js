/* @flow  */
const chars = 'abcdefghijklmnopqrstuvwxyz'
const charLength = chars.length

export default function generateClassName(
  id: number,
  className: string = '',
  filterClassName: Function
): string {
  if (id <= charLength) {
    const generatedClassName = chars[id - 1] + className
    const hasFilter = typeof filterClassName === 'function'

    if (hasFilter && !filterClassName(generatedClassName)) {
      return generateClassName(id + 1, className, filterClassName)
    }

    return generatedClassName
  }

  // Bitwise floor as safari performs much faster
  // https://jsperf.com/math-floor-vs-math-round-vs-parseint/55
  return generateClassName(
    (id / charLength) | 0,
    chars[id % charLength] + className,
    filterClassName
  )
}
