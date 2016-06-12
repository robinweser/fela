# `createRenderer([config])`

Creates a Fela renderer which silently renders your selectors, keyframes, fonts and static styles. <br>It caches all rendered styles to be able to reuse them on future rendering cycles.<br>

> Technically behaves exactly as the basic [`createRenderer(mountNode, [config])`](../createRenderer.md) does, except actually rendering the styles to a DOM node.

## Arguments
1. `config`(*Object?*): Optional renderer configuration. The most common use case adding [plugins](../advanced/Plugins.md) to process styles before they get rendered into the DOM. *(See [renderer configuration](Renderer.md#configuration) for further information)*.

### Returns
([Renderer](Renderer.md)): A silent Renderer instance.

### Example

> **Note**: Now we do not import from `fela` directly, but use `fela/server` instead, to address the server-side rendering package.

```javascript
import { createRenderer } from 'fela/server'

const rule = props => ({
  backgroundColor: 'red',
  fontSize: props.size,
  color: 'blue'
})

const renderer = createRenderer()

renderer.render(rule, { size: '12px' }) // => c0 c0-dzm1d6


console.log(renderer.renderToString())
// .c0{background-color:red;color:blue}.c0-dzm1d6{font-size:12px}
```
