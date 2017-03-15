/* @flow */
import arrayReduce from './arrayReduce'

export default function processStyleWithPlugins(
  plugins: Array<Function>,
  style: Object,
  type: number
) {
  if (plugins.length > 0) {
    return arrayReduce(
      plugins,
      (processedStyle, plugin) => {
        processedStyle = plugin(processedStyle, type)
        return processedStyle
      },
      style
    )
  }

  return style
}
