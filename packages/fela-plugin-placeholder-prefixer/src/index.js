/* @flow */
import customProperty from 'fela-plugin-custom-property'
import { arrayReduce } from 'fela-utils'

const placeholderPrefixes = [
  '::-webkit-input-placeholder',
  '::-moz-placeholder',
  ':-ms-input-placeholder',
  ':-moz-placeholder',
  '::placeholder'
]

export default function placeholderPrefixer() {
  return customProperty({
    '::placeholder': value =>
      arrayReduce(
        placeholderPrefixes,
        (style, prefix) => {
          style[prefix] = value
          return style
        },
        {}
      )
  })
}
