/* @flow */
/* eslint-disable no-console */

type Type = 1 | 2 | 3 | 4 | 5

function addLogger(style: Object, type: Type): Object {
  if (process.env.NODE_ENV !== 'production') {
    console.log(type, { ...style })
  }

  return style
}

export default () => addLogger
