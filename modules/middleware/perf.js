let counter = 0

export default (options = { }) => {
  return renderer => {
    const { stylesheet } = renderer

    const existingHandleRender = stylesheet.handleRender.bind(stylesheet)

    stylesheet.handleRender = (selector, props, plugins) => {
      const timerCounter = ++counter

      console.time('[' + counter + '] Elapsed time')
      const reference = existingHandleRender(selector, props, plugins)
      console.timeEnd('[' + counter + '] Elapsed time')

      return reference
    }

    return renderer
  }
}
