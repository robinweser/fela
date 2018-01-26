import { style } from './_style'

function generateHash(str) {
  var hash = 5381,
    i = str.length

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i)
  }

  return hash >>> 0
}

function createRenderer() {
  return {
    render(property, value) {
      return this.generateClassName(property, value)
    },
    generateClassName(property, value) {
      return generateHash(property + value).toString(36)
    },
  }
}

export default function hash() {
  const renderer = createRenderer()

  for (const property in style) {
    const className = renderer.render(property, style[property])
  }
}
