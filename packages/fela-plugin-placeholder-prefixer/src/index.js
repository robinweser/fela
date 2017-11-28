/* @flow */
import customProperty from 'fela-plugin-custom-property'
import arrayEach from 'fast-loops/lib/arrayEach'

const placeholderPrefixes = [
  '::-webkit-input-placeholder',
  '::-moz-placeholder',
  ':-ms-input-placeholder',
  ':-moz-placeholder',
  '::placeholder',
]

export default function placeholderPrefixer() {
  return customProperty({
    '::placeholder': value =>
      arrayEach(
        placeholderPrefixes,
        (style, prefix) => {
          style[prefix] = value
          return style
        },
        {}
      ),
  })
}
