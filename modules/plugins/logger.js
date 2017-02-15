/* @flow weak */
function addLogger(style, props, type) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(type, {...style}); // eslint-disable-line
  }

  return style
}

export default () => addLogger
