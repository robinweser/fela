/* @flow */
export default function processStyleWithPlugins(plugins: Array<Function>, style: Object, type: number) {
  for (let i = 0; i < plugins.length; ++i) {
    style = plugins[i](style, type)
  }

  return style
}
