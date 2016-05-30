import renderCache from './renderCache'

export default function renderToString(stylesheet) {
  let css = ''

  stylesheet.fontFaces.forEach(fontFace => css += fontFace)
  css += renderCache(stylesheet.cache)
  stylesheet.mediaCache.forEach((cache, media) => {
    css += '@media ' + media + '{' + renderCache(cache) + '}'
  })
  stylesheet.keyframes.forEach(variation => {
    variation.forEach(markup => css += markup)
  })

  return css
}
