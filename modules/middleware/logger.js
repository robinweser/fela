import cssbeautify from 'cssbeautify'

export default (options = { }) => {
  return renderer => {
    const { stylesheet } = renderer
    stylesheet.subscribe(css => {

      if (options.beautify) {
        console.log('[Fela Logger]:') // eslint-disable-line
        console.log(cssbeautify(css)) // eslint-disable-line
      } else {
        console.log('[Fela Logger]:', css) // eslint-disable-line
      }
    })

    return renderer
  }
}
