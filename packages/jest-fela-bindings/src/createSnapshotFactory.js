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
  render,
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
    const div = document.createElement('div')

    // reset renderer to have a clean setup
    renderer.clear()

    render(
      createElement(
        RendererProvider,
        { renderer },
        createElement(ThemeProvider, { theme }, component)
      ),
      div
    )

    return `${formatCSS(renderToString(renderer))}\n\n${formatHTML(
      div.innerHTML
    )}`
  }
}
