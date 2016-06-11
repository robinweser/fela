let counter = 0

export default () => renderer => {
  const existingRenderRule = renderer.renderRule.bind(renderer)

  renderer.renderRule = (rule, props) => {
    const timerCounter = ++counter

    console.time('[' + timerCounter + '] Elapsed time') // eslint-disable-line
    const className = existingRenderRule(rule, props)
    console.timeEnd('[' + timerCounter + '] Elapsed time') // eslint-disable-line

    return className
  }

  return renderer
}
