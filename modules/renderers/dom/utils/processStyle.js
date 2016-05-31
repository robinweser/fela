/**
 * executes each plugin using a predefined plugin interface
 *
 * @param {Object} pluginInterface - interface containing relevant processing data
 * @return {Object} processed style
 */
export default function processStyle(pluginInterface) {
  let { plugins, style } = pluginInterface
  // pipes each plugin by passes the plugin interface
  // NOTE: as the style are passed directly they're editable
  // therefore the plugin order might matter
  plugins.forEach(plugin => style = plugin(pluginInterface))
  return style
}