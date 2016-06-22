# DOM Rendering

Knowing all the basics, we are already able to build up our whole styling environment. But we still do not know how to actually render our styles into the DOM. Luckily this is really simple as all we have to do is call a single function.<br>
Fela provides a `render` function which takes two parameters: our renderer and a valid DOM node to render our CSS into. In general we will use a `<style>` element, but sometimes it might also be helpful to just render the styles into a `<div>` for instant review.

## Automatic Updates
Once rendered into a DOM node, a change listener will subscribe to the renderer and get notified on style changes. The DOM node will automatically be updated on changes.

## Example

```javascript
import { createRenderer, render } from 'fela'

// create and append a new stylesheet
// alternatively select an existing one
const mountNode = document.createElement('style')
document.head.appendChild(mountNode)

const rule = props => ({
  backgroundColor: 'red',
  fontSize: props.size,
  color: 'blue'
})

const renderer = createRenderer()

renderer.render(rule, { size: '12px' }) // => c0 c0-dzm1d6

render(renderer, mountNode)
console.log(mountNode.textContent)
// .c0{background-color:red;color:blue}.c0-dzm1d6{font-size:12px}

// automatically updates the DOM on changes
renderer.renderRule(rule, { size: '15px '}) // => c0 c0-dzm3l9
console.log(mountNode.textContent)
// .c0{background-color:red;color:blue}.c0-dzm1d6{font-size:12px}.c0-dzm3l9{font-size:15px}
```
