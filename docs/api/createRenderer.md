# `createRenderer([config])`

Creates a Fela renderer which renders your selectors, keyframes, fonts and static styles.<br>
It caches all rendered styles to be able to reuse them on future rendering cycles.<br>

## Arguments
1. `config`(*Object?*): Optional renderer configuration. The most common use case adding [plugins](../advanced/Plugins.md) to process styles before they get cached. *(See [Advanced - Renderer Configuration](../advanced/RenderingConfiguratio.md) for further information)*.

## Returns
([Renderer](Renderer.md)): A Renderer instance.

## Example

```javascript
import { createRenderer } from 'fela'

const rule = props => ({
  backgroundColor: 'red',
  fontSize: props.size,
  color: 'blue'
})

const renderer = createRenderer()

renderer.render(rule, { size: '12px' }) // => c0 c0-dzm1d6


console.log(renderer.renderToString())
// .c0{background-color:red;color:blue}
// .c0-dzm1d6{font-size:12px}
```
