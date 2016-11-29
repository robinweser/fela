/* @flow weak */
let warning = () => true

if (process.env.NODE_ENV !== 'production') {
  warning = (condition, message) => {
    if (!condition) {
      if (typeof console !== 'undefined') {
        console.error(message) // eslint-disable-line
      }
    }
  }
}

export default warning
