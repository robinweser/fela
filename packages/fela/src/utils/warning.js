/* @flow */
/* eslint-disable import/no-mutable-exports */
let warning = () => true

if (process.env.NODE_ENV !== 'production') {
  warning = (condition: boolean, message: string): void => {
    if (!condition) {
      if (typeof console !== 'undefined') {
        console.error(message); // eslint-disable-line
      }
    }
  }
}

export default warning
