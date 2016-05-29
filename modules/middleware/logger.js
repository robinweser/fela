import cssbeautify from 'cssbeautify'

export default (options = { }) => {
  return renderer => {
    const { stylesheet } = renderer
    stylesheet.subscribe(css => {
      console.log('[Fela Logger] New CSS has been rendered:') // eslint-disable-line
      const newCSS = options.beautify ? cssbeautify(css) : css
      console.log(newCSS) // eslint-disable-line
      console.log('') // eslint-disable-line
    })
    return renderer
  }
}
