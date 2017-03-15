/* @flow */
import arrayReduce from './arrayReduce'

export default function processStyleWithPlugins(
  plugins: Array<Function>,
  style: Object,
  type: number
) {
  return arrayReduce(
    plugins,
    (processedStyle, plugin) => {
      processedStyle = plugin(processedStyle, type)
      return processedStyle
    },
    style
  )
}
