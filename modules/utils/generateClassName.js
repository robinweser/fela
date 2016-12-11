/* @flow weak */
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

export default function generateClassName(id, className = '') {
  if (id <= 52) {
    return chars[id - 1] + className
  }

  // Bitwise floor as safari performs much faster https://jsperf.com/math-floor-vs-math-round-vs-parseint/55
  return generateClassName(id / 52 | 0, chars[id % 52] + className)
}
