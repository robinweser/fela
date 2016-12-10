/* @flow weak */
export default function processStyleWithPlugins(style, plugins, type) {
  for (let i = 0; i < plugins.length; ++i) {
    style = plugins[i](style, type)
  }

  return style
}
