/* @flow weak */
export default {
  create(styles) {
    const rules = { }

    for (let rule in styles) {
      if (typeof styles[rule] !== 'function') {
        rules[rule] = () => styles[rule]
      } else {
        rules[rule] = styles[rule]
      }
    }

    return rules
  }
}
