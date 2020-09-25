/* @flow */
import customProperty from 'fela-plugin-custom-property'
import arrayReduce from 'fast-loops/lib/arrayReduce'

const fullscreenPrefixes = [
  ':-webkit-full-screen',
  ':-moz-full-screen',
  ':-ms-fullscreen',
  ':full-screen',
  ':fullscreen',
]

export default function fullscreenPrefixer() {
  return customProperty({
    ':fullscreen': value =>
      arrayReduce(
        fullscreenPrefixes,
        (style, prefix) => {
          style[prefix] = value
          return style
        },
        {}
      ),
  })
}
