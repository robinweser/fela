import { format } from 'prettier'
import HTMLtoJSX from 'htmltojsx'

import { renderToString } from 'fela-tools'

import type { DOMRenderer } from '../../../flowtypes/DOMRenderer'

function formatCSS(css) {
  return format(css, { parser: 'css', useTabs: false, tabWidth: 2 })
}

function formatHTML(html) {
  const converter = new HTMLtoJSX({
    createClass: false,
  })

  const jsx = converter.convert(html)
  return format(jsx).replace(/[\\"]/g, '')
}

export default function createSnapshotFactory(
  createElement: Function,
  render: Function,
  defaultRenderer: Function,
  defaultRendererProvider: Function,
  defaultThemeProvider: Function
): Function {
  return function createSnapshot(
    component: any,
    theme: Object = {},
    renderer: DOMRenderer = defaultRenderer,
    RendererProvider: Function = defaultRendererProvider,
    ThemeProvider: Function = defaultThemeProvider
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
