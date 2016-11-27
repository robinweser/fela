/* @flow weak */
function addIsolation(style) {
  if (style.isolation === false) {
    // remove the isolation prop to
    // prevent false CSS properties
    delete style.isolation
    return style
  }

  return { all: 'initial', ...style }
}

export default () => style => addIsolation(style)
