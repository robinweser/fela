/* @flow weak */
export default function assignStyles(base, ...extendingStyles) {
  for (let i = 0, len = extendingStyles.length; i < len; ++i) {
    const style = extendingStyles[i]

    for (const property in style) {
      const value = style[property]
      const baseValue = base[property]

      if (baseValue instanceof Object) {
        if (Array.isArray(baseValue)) {
          if (Array.isArray(value)) {
            base[property] = [...baseValue, ...value]
          } else {
            base[property] = [...baseValue, value]
          }
          continue
        }

        if (value instanceof Object && !Array.isArray(value)) {
          base[property] = assignStyles({}, baseValue, value)
          continue
        }
      }

      base[property] = value
    }
  }

  return base
}
