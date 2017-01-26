/* @flow weak */
import assign from '../utils/assign'

function addLogger(style, props, type) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(type, assign({}, style)); // eslint-disable-line
  }

  return style
}

export default () => addLogger
