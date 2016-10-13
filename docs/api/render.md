# `render(renderer, mountNode)`

Renders all cached styles into a DOM node. It also adds a change listener to automatically add newly rendered styles.<br>

## Arguments
1. `renderer` ([*Renderer*](Renderer.md)): The renderer providing the styles which are rendered into the `mountNode`.
1. `mountNode` (*[HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)*): DOM node to render your CSS into. In production it **must** be a  [`<style>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style) element. Though in development, all other [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)s will work too, e.g. if you want to render the CSS into a [`<div>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div) for debugging.

## Example

```javascript
import { createRenderer, render } from 'fela'

// You would most likely add an existing <style>-element
// to your index.html and reference it with a special id
const mountNode = document.getElementById('stylesheet')

const rule = props => ({
  backgroundColor: 'red',
  fontSize: props.size,
  color: 'blue'
})

const renderer = createRenderer()

renderer.render(rule, { size: '12px' }) // => c0 c0-dzm1d6

render(renderer, mountNode)
console.log(mountNode.textContent)

// automatically adds the rule to the stylesheet
renderer.renderRule(rule, { size: '15px '}) // => c0 c0-dzm3l9
```
