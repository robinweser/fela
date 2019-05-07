import { createRenderer } from 'fela'
import typescript from 'fela-plugin-typescript'

export const renderer = createRenderer({
  plugins: [
    typescript()
  ]
})
