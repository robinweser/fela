/* @flow */
export default function processStyleWithPlugins(plugins: Array<Function>, style: Object, type: number) {
  for (let i = 0, len = plugins.length; i < len; ++i) {
    style = plugins[i](style, type)
  }

  return style
}
