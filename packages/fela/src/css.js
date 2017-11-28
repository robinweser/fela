/* @flow */
let didWarn

export default function css(rule: Function): Function {
  // we should warn if this method is used for production
  // even if it doesn't add any additional load or overhead
  // we should make sure to use the babel-plugin-fela
  // even if no configuration is passed and thus
  // it only removes the css() function calls
  if (process.env.NODE_ENV === 'production' && !didWarn) {
    console.error(
      `Looks like you're using the css()-API from "fela" in production-mode. While it doesn't do anything but return the input, you should use the babel-plugin-fela to remove the function calls.`
    )

    didWarn = true
  }

  // right now we simply return the exact same rule
  // we might add some additional functionality later but for now
  // its just a placeholder for further optimizations
  return rule
}
