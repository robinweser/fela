/* @flow  */
import hash from 'string-hash'

export default function generateUniqueHash(reference: string): string {
  return '_' + hash(reference).toString(36)
}
