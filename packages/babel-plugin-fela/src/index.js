import createPlugin from './createPlugin'
import deprecate from './deprecate'

deprecate(`
The Fela Babel plugin (babel-plugin-fela) is deprecated, please remove it from your Babel configuration.
It's use could lead to false output with newer Fela versions and doesn't add much value at all.
`)
export default createPlugin()
