/* @flow */
import customProperty from 'fela-plugin-custom-property'
import reduce from 'lodash/reduce'

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
      reduce(
        placeholderPrefixes,
        (style, prefix) => {
          style[prefix] = value
          return style
        },
        {}
      ),
  })
}
