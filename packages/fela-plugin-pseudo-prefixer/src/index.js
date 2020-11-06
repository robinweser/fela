/* @flow */
import customProperty from 'fela-plugin-custom-property'
import arrayReduce from 'fast-loops/lib/arrayReduce'

export default function pseudoPrefixer(
  pseudoSelector: string,
  prefixes: Array<string>
) {
  return customProperty({
    [pseudoSelector]: value =>
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
