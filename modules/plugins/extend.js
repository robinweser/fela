import assign from '../utils/assign'


function extendStyle(style, extension) {
  // extend conditional style objects
  if (extension.hasOwnProperty('condition')) {
    if (extension.condition) {
      assign(style, extension.style)
    }
  } else {
    // extend basic style objects
    assign(style, extension)
  }
}

function extend(style) {
  Object.keys(style).forEach(property => {
    const value = style[property]
    if (property === 'extend') {
      // arrayify to loop each extension to support arrays and single extends
      [ ].concat(value).forEach(extension => extendStyle(style, extension))
      delete style[property]
    } else if (value instanceof Object && !Array.isArray(value)) {
      // support nested extend as well
      style[property] = extend(value)
    }
  })

  return style
}

export default () => extend
