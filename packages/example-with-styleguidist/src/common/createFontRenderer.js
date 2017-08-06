import createRenderer from './createFelaRenderer'

export default (renderer = createRenderer(), theme) => {
  if (!theme || !theme.fonts) return

  // loop through all the fonts in base theme and render them to the head.
  Object.keys(theme.fonts).forEach(key => {
    const fontsArr =
      theme.fonts[key] && theme.fonts[key].constructor === Array
        ? theme.fonts[key]
        : [theme.fonts[key]]
    fontsArr.forEach(conf =>
      renderer.renderFont(key, conf.files, conf.options)
    )
  })
}
