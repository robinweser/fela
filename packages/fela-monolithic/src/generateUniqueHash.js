import hash from 'string-hash'

const collisionBuffer = {}
export default function generateUniqueHash(reference = {}) {
  let result =
    typeof reference === 'object' ? JSON.stringify(reference) : reference
  let prevResult

  do {
    prevResult = result
    result = hash(prevResult).toString(36)
  } while (collisionBuffer[result] && collisionBuffer[result] !== prevResult)

  collisionBuffer[result] = prevResult

  return `_${result}`
}
