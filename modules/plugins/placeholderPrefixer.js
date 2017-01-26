/* @flow weak */
import customProperty from './customProperty'

const placeholderPrefixes = [
  '::-webkit-input-placeholder',
  '::-moz-placeholder',
  ':-ms-input-placeholder',
  ':-moz-placeholder',
  '::placeholder'
]

export default () => customProperty({
  '::placeholder': value => placeholderPrefixes.reduce((style, prefix) => {
    style[prefix] = value
    return style
  }, {})
})
