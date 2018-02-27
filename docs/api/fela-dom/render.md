# render

Renders all cached styles into the DOM.<br>
It also adds a change listener to automatically add newly rendered styles.

## Arguments
| Argument | Type | Description |
| --- | --- | --- |
| renderer | [*Renderer*](../fela/Renderer.md) | The renderer providing the styles which are rendered to the DOM. |


## Example

```javascript
import { createRenderer } from 'fela'
import { render } from 'fela-dom'

const rule = props => ({
  backgroundColor: 'red',
  fontSize: props.size,
  color: 'blue'
})

const renderer = createRenderer()

renderer.render(rule, { size: '12px' }) // => a b c

render(renderer)

// automatically adds the rule to the stylesheet
renderer.renderRule(rule, { size: '15px '}) // => a d c
```
