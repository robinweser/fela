function validator(style, options) {
  const { logInvalid, deleteInvalid } = options

  Object.keys(style).forEach(property => {
    const value = style[property]
    if (value === undefined || (typeof value === 'string' && value.indexOf('undefined') > -1)) {
      if (deleteInvalid) {
        delete style[property]
      }
      if (logInvalid) {
        console.log((deleteInvalid ? '[Deleted] ' : ' ') + 'Invalid Property', { // eslint-disable-line
          property,
          value
        })
      }
    } else if (value instanceof Object && !Array.isArray(value)) {
      style[property] = validator(value, options)
    }
  })

  return style
}

const defaultOptions = { logInvalid: true, deleteInvalid: false }
export default (options) => style => validator(style, {
  ...defaultOptions,
  ...options
})
