import pseudoPrefixer from 'fela-plugin-pseudo-prefixer'

const fullscreenPrefixes = [
  ':-webkit-full-screen',
  ':-moz-full-screen',
  ':-ms-fullscreen',
  ':full-screen',
  ':fullscreen',
]

export default function fullscreenPrefixer() {
  return pseudoPrefixer(':fullscreen', fullscreenPrefixes)
}
