import FelaComponent from './FelaComponent'
import FelaTheme from './FelaTheme'
import RendererProvider from './RendererProvider'

import composeMods from '../utils/composeMods'

export default function transformer(file, api, options) {
  return composeMods(RendererProvider, FelaTheme, FelaComponent)(
    file,
    api,
    options
  )
}
