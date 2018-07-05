import React from 'react'
import { render } from 'react-dom'
import { format } from 'prettier'
import HTMLtoJSX from 'htmltojsx'
import { renderToString } from 'fela-tools'
import { Provider as RendererProvider } from 'react-fela'

function newLine(str) {
  return '\n' + str
}

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

export default function createSnapshot(
  component,
  renderer,
  Provider = RendererProvider
) {
  const div = document.createElement('div')

  // reset renderer to have a clean setup
  renderer.clear()

  render(<Provider renderer={renderer}>{component}</Provider>, div)

  return (
    formatCSS(renderToString(renderer)) + '\n\n' + formatHTML(div.innerHTML)
  )
}
