/* @flow  */
const chars = 'abcdefghijklmnopqrstuvwxyz'
const charLength = chars.length

export default function generateClassName(
  getId: Function,
  filterClassName: Function = () => true
): string {
  const startId = getId()
  const generatedClassName = generateUniqueClassName(startId)

  if (!filterClassName(generatedClassName)) {
    return generateClassName(getId, filterClassName)
  }

  return generatedClassName
}

function generateUniqueClassName(id: number, className: string = ''): string {
  if (id <= charLength) {
    return chars[id - 1] + className
  }

  // Bitwise floor as safari performs much faster
  // https://jsperf.com/math-floor-vs-math-round-vs-parseint/55
  return generateUniqueClassName(
    (id / charLength) | 0,
    chars[id % charLength] + className
  )
}
