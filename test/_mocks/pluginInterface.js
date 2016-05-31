export default function pluginInterface(style, plugins) {
  return {
    style: style,
    plugins: plugins,
    processStyle: pluginInterface => {
      const { plugins, style } = pluginInterface
      plugins.forEach(plugin => plugin(pluginInterface))

      return style
    }
  }
}
