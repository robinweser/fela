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
    let markup

    if (renderToMarkup.renderToStaticMarkup) {
      markup = renderToMarkup.renderToStaticMarkup(
        createElement(
          RendererProvider,
          { renderer },
          createElement(ThemeProvider, { theme }, component)
        )
      )
    } else {
      const div = document.createElement('div')
      renderToMarkup.render(
        createElement(
          RendererProvider,
          { renderer },
          createElement(ThemeProvider, { theme }, component)
        ),
        div
      )
      markup = div.innerHTML
    }

    return `${formatCSS(renderToString(renderer))}\n\n${formatHTML(markup)}`
  }
}
