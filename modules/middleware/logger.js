import cssbeautify from 'cssbeautify'

function compareString(a, b) {
  var i = 0
  var j = 0
  var result = ''

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


export default (options = { }) => {
  return renderer => {
    const { stylesheet } = renderer

    let oldCSS = ''

    stylesheet.subscribe(css => {
      const diff = compareString(oldCSS, css)
      oldCSS = css

      if (options.beautify) {
        console.log('CSS changed: ')
        console.log(cssbeautify(diff))
      } else {
        console.log('CSS changed: ' + diff)
      }
    })

    return renderer
  }
}
