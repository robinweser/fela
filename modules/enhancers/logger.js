/* @flow weak */
import cssbeautify from 'cssbeautify'

/**
 * adds a logging tool which listens to renderer changes
 *
 * @param {Object} renderer - renderer which gets enhanced
 * @param {Object} options - logging options
 * @return {Object} enhanced renderer
 */
function addLogger(renderer, options) {
  renderer.subscribe(change => {
    // log clearing
    if (change.type === 'clear') {
      console.log('Cleared renderer cache.') // eslint-disable-line
      return true
    }

    // log status of rehydration
    if (change.type === 'rehydrate') {
      console.log('Renderer rehydration ' + (change.done ? 'finished' : 'started') + '.') // eslint-disable-line
      return true
    }

    const selector = change.selector || change.font || change.name
    const style = change.style || change.fontFace
    const css = options.format ? cssbeautify(change.css) : change.css
    const isMedia = change.media && change.media.length > 0


    // logs all information in a group
    console.group(selector) // eslint-disable-line
    isMedia && console.log(change.media) // eslint-disable-line
    options.logStyleObject && console.log(style) // eslint-disable-line
    options.logCSS && console.log(css) // eslint-disable-line
    console.groupEnd(selector) // eslint-disable-line
  })

  return renderer
}

const defaultOptions = {
  logStyleObject: true,
  logCSS: false,
  formatCSS: false
}

export default (options = { }) => renderer => addLogger(renderer, {
  ...defaultOptions,
  ...options
})
