# DOM Rendering

Knowing all the basics, we are already able to build up our whole styling environment. But we still do not know how to actually render our styles into the DOM. Luckily this is really simple as all we have to do is call a single function.<br>
Fela provides a `render` function which takes two parameters: our renderer and a valid DOM node to render our CSS into.

## Automatic Updates
Once rendered into a DOM node, a change listener will subscribe to changes. The DOM node will automatically be updated on changes.

#### Development vs. Production
**In production** it uses an optimized rendering mechanism based on [`CSSStyleSheet.insertRule`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule) to update as performant as possible. Therefore be sure to **only** use `style` nodes in production.

**In development** you may use any valid DOM node as it uses `node.textContent` to update styles. This also implies that Fela is even faster in production, so be sure to use the production environment for production builds.

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

// automatically adds the rule to the mountNode
renderer.renderRule(rule, { size: '15px '}) // => c0 c0-dzm3l9
```

<br>

---

### Related
* [API reference - `render`](../api/render.md)
