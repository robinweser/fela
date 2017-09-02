import createPlugin from './createPlugin'

import { createRenderer } from 'fela'
import webPreset from 'fela-preset-web'

export default createPlugin({
  renderer: createRenderer({
    plugins: [...webPreset]
  }),
  precompile: true
})

export { createPlugin }
