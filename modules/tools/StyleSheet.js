/* @flow */
export default {
  create(styles: Object): Object {
    const rules = {}

    for (const rule in styles) {
      if (typeof styles[rule] !== 'function') {
        rules[rule] = () => styles[rule]
      } else {
        rules[rule] = styles[rule]
      }
    }

    return rules
  }
}
