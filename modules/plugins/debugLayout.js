function debugLayout(style, meta, options) {
  if (meta.type === 'rule') {
    const ruleName = meta.rule.name
    const color = (ruleName + ruleName).length * 17 * ruleName.length

    if (options.backgroundColor) {
      style.backgroundColor = 'hsla(' + color + ', 100%, 25%, 0.1) !important'
    } else {
      style.outline = options.thickness + 'px solid hsl(' + color + ', 100%, 50%) !important'
    }
  }

  return style
}

const defaultOptions = { backgroundColor: false, thickness: 1 }
export default (options) => (style, meta) => debugLayout(style, meta, {
  ...defaultOptions,
  ...options
})
