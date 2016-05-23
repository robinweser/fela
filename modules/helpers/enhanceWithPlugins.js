/**
 * Enhances a Renderer to automatically render with a set of plugins
 * @param {FelaRenderer} renderer - renderer that gets enhanced
 * @param {function[]} plugins - array of plugin functions
 * @return enhanced renderer
 */
export default function enhanceWithPlugins(renderer, plugins) {
  // cache the initial render function to later refer to
  // it would else get overwritten directly
  const existingRenderFunction = renderer.render.bind(renderer)
  renderer.render = (selector, props, additionalPlugins = [ ]) => {
    // concat enhancing plugins with additional plugins to allow multiple
    // enhancing cycles without loosing the ability to render with additional plugins
    return existingRenderFunction(selector, props, plugins.concat(additionalPlugins))
  }

  return renderer
}
