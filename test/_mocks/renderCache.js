export default function renderCache(cache) {
  let css = ''

  cache.forEach(variation => {
    variation.forEach((markup, propsReference) => {
      if (propsReference !== 'static') {
        css += markup
      }
    })
  })

  return css
}
