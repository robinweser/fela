/* @flow weak */
function addIsolation(style, exclude = [ ]) {
  if (style.isolation === false) {
    // remove the isolation prop to
    // prevent false CSS properties
    delete style.isolation
    return style
  }

  const excludedDeclarations = exclude.reduce((exclusion, property) => {
    exclusion[property] = 'inherit'
    return exclusion
  }, { })

  return {
    all: 'initial',
    ...excludedDeclarations,
    ...style
  }
}

export default (options = { }) => style => addIsolation(style, options.exclude)
