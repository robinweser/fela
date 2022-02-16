import sortFn from 'sort-css-media-queries'

export default function sortMediaQueryOrder() {
  return (renderer) => {
    renderer.sortMediaQuery = sortFn
    return renderer
  }
}
