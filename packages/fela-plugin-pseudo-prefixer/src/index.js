import customProperty from 'fela-plugin-custom-property'
import { arrayReduce } from 'fast-loops'

export default function pseudoPrefixer(pseudoSelector, prefixes) {
  return customProperty({
    [pseudoSelector]: (value) =>
      arrayReduce(
        prefixes,
        (style, prefix) => {
          style[prefix] = value
          return style
        },
        {}
      ),
  })
}
