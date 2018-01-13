import { style } from './_style'

const chars = 'abcdefghijklmnopqrstuvwxyz'
const charLength = chars.length

function createRenderer() {
  return {
    counter: 1,
    render(property, value) {
      return this.generateClassName(this.counter++)
    },
    generateClassName(id, className = '') {
      if (id <= charLength) {
        return chars[id - 1] + className
      }

      return this.generateClassName(
        (id / charLength) | 0,
        chars[id % charLength] + className
      )
    },
  }
}

export default function counter() {
  const renderer = createRenderer()

  for (const property in style) {
    const className = renderer.render(property, style[property])
  }
}
