import cssbeautify from 'cssbeautify'

function compareString(a, b) {
  let i = 0
  let j = 0
  let result = ''

  while (j < b.length) {
    if (a[i] != b[j] || i == a.length) {
      result += b[j]
    } else {
      i++
    }
    j++
  }
  return result
}


export default (options = { }) => renderer => {
  let oldCSS = ''

  renderer.subscribe(css => {
    const diff = compareString(oldCSS, css)
    oldCSS = css

    if (options.beautify) {
      console.log('CSS changed: ') // eslint-disable-line
      console.log(cssbeautify(diff)) // eslint-disable-line
    } else {
      console.log('CSS changed: ' + diff) // eslint-disable-line
    }
  })

  return renderer
}
