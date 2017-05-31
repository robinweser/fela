# `renderToString(renderer)`

Renders all cached styles into a single CSS string. Styles are grouped in the following order:

1. Fonts
2. Static Styles
3. Rules
4. Media Query Rules (clustered)
5. Keyframes

### Returns
(*string*): Single concatenated CSS string containing all cached styles by that time.

### Example
```javascript
import { renderToString } from 'fela-dom/server'
import { createRenderer } from 'fela'

const renderer = createRenderer()

const rule = props => ({
  fontSize: props.fontSize,
  color: 'blue'
})

renderer.renderStatic('html,body{box-sizing:border-box;margin:0}').
renderer.renderRule(rule, { fontSize: '12px' })

const css = renderToString(renderer)

console.log(css)
// html,body{box-sizing:border-box;margin:0}
// .a{font-size:12px}.b{color:blue}
```
