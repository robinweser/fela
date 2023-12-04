const REGEX = /\s+/g

function sortClassNames(renderer) {
  const existingRenderRule = renderer.renderRule.bind(renderer)

  renderer.renderRule = (...args) => {
    const className = existingRenderRule(...args)
    return className
      .split(REGEX)
      .sort((a, b) => {
        if (a < b) {
          return -1
        }
        if (a > b) {
          return +1
        }
        return 0
      })
      .join(' ')
  }

  return renderer
}

export default () => sortClassNames
