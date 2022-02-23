import isPlainObject from 'isobject'

function typescript(style) {
  for (const property in style) {
    const value = style[property]

    if (property === 'nested' && isPlainObject(value)) {
      Object.assign(style, typescript(value))
      delete style.nested
    } else if (isPlainObject(value)) {
      typescript(value)
    }
  }

  return style
}

export default () => typescript
