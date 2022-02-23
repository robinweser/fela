export default function sortMediaQuery(mediaQueryOrder = []) {
  return function sort(a, b) {
    if (mediaQueryOrder.indexOf(b) === -1) {
      if (mediaQueryOrder.indexOf(a) === -1) {
        return 0
      }

      return -1
    }
    if (mediaQueryOrder.indexOf(a) === -1) {
      return 1
    }

    return mediaQueryOrder.indexOf(a) - mediaQueryOrder.indexOf(b)
  }
}
