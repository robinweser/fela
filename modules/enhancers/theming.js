function addTheming(renderer, theme) {
  // add the current theme to the renderer
  renderer.theme = theme

  // pass the theme as second argument when resolving style
  renderer._resolveStyle = (style, props) => style(props, renderer.theme)

  // adds a helper to dynamically update the theme
  renderer.updateTheme = newTheme => renderer.theme = newTheme

  return renderer
}

export default theme => renderer => addTheming(renderer, theme)
