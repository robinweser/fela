import assign from '../utils/assign'

export default (options = { }) => (style, meta) => {
  const logMetaData = options.logMetaData || false

  const currentStyle = assign({ }, style)

  if (logMetaData) {
    const reference = meta.className || meta.selector || meta.animationName
    console.log(meta.type.toUpperCase() + ' ' + reference, currentStyle, meta) // eslint-disable-line
  } else {
    console.log(currentStyle) // eslint-disable-line
  }

  return style
}
