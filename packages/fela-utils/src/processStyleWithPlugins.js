import { arrayReduce } from 'fast-loops'

export default function processStyleWithPlugins(
  renderer,
  style,
  type,
  props = {},
  plugins = renderer.plugins
) {
  if (plugins.length > 0) {
    return arrayReduce(
      plugins,
      (processedStyle, plugin) => plugin(processedStyle, type, renderer, props),
      style
    )
  }

  return style
}
