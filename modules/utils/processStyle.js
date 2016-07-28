/**
 * pipes a style object through a list of plugins
 *
 * @param {Object} style - style object to process
 * @param {Object} meta - additional meta data
 * @param {Function[]} plugins - plugins used to process style
 * @return {Object} processed style
 */
export default function processStyle(style, meta, plugins) {
  return plugins.reduce((processedStyle, plugin) => plugin(processedStyle, meta), style)
}