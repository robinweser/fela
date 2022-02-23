const REGEX = /\s+/g

function sortClassNames(renderer) {
  const existingRenderRule = renderer.renderRule.bind(renderer)

  renderer.renderRule = (...args) => {
    const className = existingRenderRule(...args)
    return className
      .split(REGEX)
      .sort((a, b) => (a < b ? -1 : a > b ? +1 : 0))
      .join(' ')
  }

  return renderer
}

export default () => sortClassNames
