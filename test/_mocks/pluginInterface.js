export default function pluginInterface(styles, plugins) {
  return {
    styles: styles,
    plugins: plugins,
    processStyles: pluginInterface => {
      const { plugins, styles } = pluginInterface
      plugins.forEach(plugin => plugin(pluginInterface))

      return styles
    }
  }
}
