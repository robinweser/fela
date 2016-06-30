export default {
  create(styles) {
    return Object.keys(styles).reduce((rules, rule) => {
      if (typeof styles[rule] !== 'function') {
        rules[rule] = () => styles[rule]
      } else {
        rules[rule] = styles[rule]
      }

      return rules
    }, { })
  }
}
