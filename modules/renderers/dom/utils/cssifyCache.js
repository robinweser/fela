/**
 * renders a whole cache into a single CSS string
 *
 * @param {Map} cache - cache including all selector variations
 * @return {string} valid CSS string
 */
export default function cssifyCache(cache) {
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