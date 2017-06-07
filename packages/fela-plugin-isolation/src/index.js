/* @flow */
import { arrayReduce } from 'fela-utils'

function addIsolation(style: Object, exclude: Array<string> = []): Object {
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
    ...style
  }
}

export default function isolation(options: Object = {}) {
  return (style: Object) => addIsolation(style, options.exclude)
}
