function loggerPlugin(style, type) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line
    console.log(type, { ...style })
  }

  return style
}

export default function logger() {
  return loggerPlugin
}
