import { renderToString } from 'fela-tools'
import { formatCSS, formatHTML } from './utils'

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
