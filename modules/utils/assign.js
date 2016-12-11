/* @flow weak */
export default function assign(base, ...extendingStyles) {
  for (let i = 0, len = extendingStyles.length; i < len; ++i) {
    const style = extendingStyles[i]

    for (let property in style) {
      const value = style[property]

      if (base[property] instanceof Object && value instanceof Object) {
        base[property] = assign({}, base[property], value)
      } else {
        base[property] = value
      }
    }
  }

  return base
}
