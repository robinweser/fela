/* @flow weak */
import customProperty from './customProperty'

const placeholderPrefixes = [
  '::-webkit-input-placeholder',
  '::-moz-placeholder',
  ':-ms-input-placeholder',
  ':-moz-placeholder',
  '::placeholder'
]

export default () =>
  customProperty({
    '::placeholder': (value) => {
      const style = {}

      for (let i = 0, len = placeholderPrefixes.length; i < len; ++i) {
        style[placeholderPrefixes[i]] = value
      }
      return style
    }
  })
