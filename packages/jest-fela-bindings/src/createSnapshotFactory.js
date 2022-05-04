import { format } from 'prettier'
import HTMLtoJSX from 'htmltojsx'

import { renderToString } from 'fela-tools'

function formatCSS(css) {
  return format(css, { parser: 'css', useTabs: false, tabWidth: 2 })
}

function formatHTML(html) {
  const converter = new HTMLtoJSX({
    createClass: false,
  })

  const jsx = converter.convert(html)
  return format(jsx, { parser: 'babel' }).replace(/[\\"]/g, '')
}

export default function createSnapshotFactory(
  createElement,
  renderToMarkup,
  defaultRenderer,
  defaultRendererProvider,
  defaultThemeProvider
) {
  return function createSnapshot(
    component,
    theme = {},
    renderer = defaultRenderer,
    RendererProvider = defaultRendererProvider,
    ThemeProvider = defaultThemeProvider
  ) {
    // reset renderer to have a clean setup
    renderer.clear()

    const markup = renderToMarkup(
      createElement(
        RendererProvider,
        { renderer },
        createElement(ThemeProvider, { theme }, component)
      )
    )

    return `${formatCSS(renderToString(renderer))}\n\n${formatHTML(markup)}`
  }
}
