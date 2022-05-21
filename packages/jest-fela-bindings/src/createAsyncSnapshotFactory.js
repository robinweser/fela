import { renderToString } from 'fela-tools'
import { formatCSS, formatHTML } from './utils'

function getFormattedOutput(renderer, markup) {
  return `${formatCSS(renderToString(renderer))}\n\n${formatHTML(markup)}`
}

export default function createSnapshotFactory(
  createElement,
  renderHandler,
  defaultRenderer,
  defaultRendererProvider,
  defaultThemeProvider
) {
  return async function createSnapshot(
    component,
    theme = {},
    renderer = defaultRenderer,
    RendererProvider = defaultRendererProvider,
    ThemeProvider = defaultThemeProvider
  ) {
    // reset renderer to have a clean setup
    renderer.clear()

    // Node environment
    if (typeof window === 'undefined') {
      const markup = renderHandler.renderToStaticMarkup(
        createElement(
          RendererProvider,
          { renderer },
          createElement(ThemeProvider, { theme }, component)
        )
      )
      return getFormattedOutput(renderer, markup)
    }
    // async createRoot, JSDOM
    const createRoot = renderHandler.createRoot
    if (createRoot.createRoot) {
      const div = document.createElement('div')
      const root = createRoot.createRoot(div)
      const markup = await new Promise((resolve) => {
        root.render(
          createElement(
            RendererProvider,
            { renderer },
            createElement(
              ThemeProvider,
              { theme },
              createElement(
                createRoot.CallbackWrapper,
                { callback: () => resolve(div.innerHTML) },
                component
              )
            )
          )
        )
      })
      return getFormattedOutput(renderer, markup)
    }

    // async render, JSDOM
    if (renderHandler.render) {
      const div = document.createElement('div')
      const markup = await new Promise((resolve) => {
        renderHandler.render(
          createElement(
            RendererProvider,
            { renderer },
            createElement(ThemeProvider, { theme }, component)
          ),
          div,
          () => resolve(div.innerHTML)
        )
      })
      return getFormattedOutput(renderer, markup)
    }
    return ''
  }
}
