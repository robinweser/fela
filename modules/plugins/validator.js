function validateStyleObject(style, logInvalid, deleteInvalid) {
  Object.keys(style).forEach(property => {
    const value = style[property]
    if (value instanceof Object && !Array.isArray(value)) {
      if (property.indexOf(':') === 0 || property.substr(0, 6) === '@media') {
        validateStyleObject(value, logInvalid, deleteInvalid)
      } else {
        if (deleteInvalid) {
          delete style[property]
        }
        if (logInvalid) {
          console.error((deleteInvalid ? '[Deleted] ' : ' ') + 'Invalid nested property. Only use nested `@media` queries or `:` pseudo classes. Maybe you forgot to add a plugin that resolves `' + property + '`.', { // eslint-disable-line
            property,
            value
          })
        }
      }
    }
  })
}

function validator(style, meta, options) {
  const { logInvalid, deleteInvalid } = options

  if (meta.type === 'keyframe') {
    Object.keys(style).forEach(percentage => {
      const percentageValue = parseFloat(percentage)
      const value = style[percentage]
      if (value instanceof Object === false) {
        if (logInvalid) {
          console.error((deleteInvalid ? '[Deleted] ' : ' ') + 'Invalid keyframe value. An object was expected.', { // eslint-disable-line
            percentage: percentage,
            style: value
          })
        }
        if (deleteInvalid) {
          delete style[percentage]
        }
      } else {
        // check for invalid percentage values, it only allows from, to or 0% - 100%
        if (!percentage.match(/from|to|%/) || percentage.indexOf('%') > -1 && (percentageValue < 0 || percentageValue > 100)) {
          if (logInvalid) {
            console.error((deleteInvalid ? '[Deleted] ' : ' ') + 'Invalid keyframe property. Expected either `to`, `from` or a percentage value between 0 and 100.', { // eslint-disable-line
              percentage: percentage,
              style: value
            })
          }
          if (deleteInvalid) {
            delete style[percentage]
          }
        }
      }
    })
  } else if (meta.type === 'rule') {
    validateStyleObject(style, logInvalid, deleteInvalid)
  }

  return style
}

const defaultOptions = { logInvalid: true, deleteInvalid: false }
export default (options) => (style, meta) => validator(style, meta, {
  ...defaultOptions,
  ...options
})
