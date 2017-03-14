/* @flow */
import reduce from 'lodash/reduce'

export default function processStyleWithPlugins(
  plugins: Array<Function>,
  style: Object,
  type: number
) {
  return reduce(
    plugins,
    (processedStyle, plugin) => {
      processedStyle = plugin(processedStyle, type)
      return processedStyle
    },
    style
  )
}
