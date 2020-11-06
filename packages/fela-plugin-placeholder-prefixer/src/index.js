/* @flow */
import pseudoPrefixer from 'fela-plugin-pseudo-prefixer'

const placeholderPrefixes = [
  '::-webkit-input-placeholder',
  '::-moz-placeholder',
  ':-ms-input-placeholder',
  ':-moz-placeholder',
  '::placeholder',
]

export default function placeholderPrefixer() {
  return pseudoPrefixer('::placeholder', placeholderPrefixes)
}
