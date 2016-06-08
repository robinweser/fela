# `createRenderer(mountNode, [config])`

Creates a Fela renderer which renders your selectors, keyframes, fonts and static styles to the DOM. <br>It caches all rendered styles to be able to reuse them on future rendering cycles.<br>

## Arguments
1. `mountNode` (*[Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)*): DOM node to render your CSS into. It should be a [`<style>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style) element. Though in development, all other [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)s will work too, e.g. if you want to render the CSS into a [`<div>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div) for debugging.
2. `config`(*Object?*): Optional renderer configuration. The most common use case adding [plugins](../advanced/Plugins.md) to process styles before they get rendered into the DOM. *(See [renderer configuration](Renderer.md#configuration) for further information)*.

### Returns
([Renderer](Renderer.md)): A Renderer instance bound to the `mountNode`.

### Example

```javascript
import { createRenderer } from 'fela'

// You would most likely add an existing <style>-element
// to your index.html and reference it with a special id
const mountNode = document.getElementById('stylesheet')

const rule = props => ({
  backgroundColor: 'red',
  fontSize: props.size,
  color: 'blue'
})

const renderer = createRenderer(mountNode)

renderer.render(rule, { size: '12px' }) // => c0 c0-dzm1d6


console.log(mountNode.textContent)
// .c0{background-color:red;color:blue}.c0-dzm1d6{font-size:12px}
```