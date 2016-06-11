export default function assign(base, ...args) {
  return args.reduce((extend, obj) => {
    for (let property in obj) {
      const value = obj[property]
      if (extend[property] instanceof Object && value instanceof Object) {
        extend[property] = assign({ }, extend[property], value)
      } else {
        extend[property] = value
      }
    }
    return extend
  }, base)
}
