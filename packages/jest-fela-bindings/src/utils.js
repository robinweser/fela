import { format } from 'prettier'
import HTMLtoJSX from 'htmltojsx'

export function formatCSS(css) {
  return format(css, { parser: 'css', useTabs: false, tabWidth: 2 })
}

export function formatHTML(html) {
  const converter = new HTMLtoJSX({
    createClass: false,
  })

  const jsx = converter.convert(html)
  return format(jsx, { parser: 'babel' }).replace(/[\\"]/g, '')
}
