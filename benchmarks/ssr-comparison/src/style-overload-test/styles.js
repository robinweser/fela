import { ITERATIONS } from './iterations'

export const containerStyle = {
  backgroundColor: 'rebeccapurple'
}

export const buttonStyles = Array(ITERATIONS)
  .fill()
  .map((_, i) => ({
    backgroundColor: 'turquoise',
    display: 'block',
    paddingLeft: i + 'px'
  }))

export const buttonClassNames = buttonStyles.map((_, i) => `button-${i}`)

const stylesheet = {
  container: containerStyle
}
for (let i = 0; i < buttonClassNames.length; i++) {
  stylesheet[buttonClassNames[i]] = buttonStyles[i]
}
export { stylesheet }
