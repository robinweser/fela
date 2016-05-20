/**
 * Enhances a Selector to automatically render with a set of plugins
 * @param {Selector} selector - selector that gets enhanced
 * @param {function[]} plugins - array of plugin functions
 * @return enhanced selector
 */
export default function enhanceWithPlugins(selector, plugins) {
  // cache the initial render function to later refer to
  // it would else get overwritten directly
  const existingRenderFunction = selector.render.bind(selector)
  selector.render = (props, additionalPlugins = [ ]) => {
    // concat enhancing plugins with additional plugins to allow multiple
    // enhancing cycles without loosing the ability to render with additional plugins
    return existingRenderFunction(props, plugins.concat(additionalPlugins))
  }

  return selector
}
