import { arrayReduce } from 'fast-loops'

function addIsolation(style, exclude = []) {
  if (style.isolation === false) {
    // remove the isolation prop to
    // prevent false CSS properties
    delete style.isolation
    return style
  }

  const excludedDeclarations = arrayReduce(
    exclude,
    (exclusion, property) => {
      exclusion[property] = 'inherit'
      return exclusion
    },
    {}
  )

  return {
    all: 'initial',
    ...excludedDeclarations,
    ...style,
  }
}

export default function isolation(options = {}) {
  return function isolationPlugin(style) {
    return addIsolation(style, options.exclude)
  }
}
