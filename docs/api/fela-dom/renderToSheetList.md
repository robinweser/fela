# renderToSheetList

This advanced API is pretty similar to [renderToMarkup](renderToMarkup.md) as it also helps to render the renderer on the server.<br>
Instead of returning a single string of HTML containing style elements, it returns a list of so called style sheets.
Each style sheet contains everything we need to be able to render actual style elements on the server.

> Check the [renderToMarkup](renderToMarkup.md) output in order to correctly create custom `style` elements that can be rehydrated.

## Arguments
| Argument | Type | Description |
| --- | --- | --- |
| renderer | [*Renderer*](../fela/Renderer.md) | The renderer providing the styles which are rendered to a list of sheet data. |

### Returns
(*Object[]*): List of style sheet objects

#### Shape
Every style sheet object has the following shape:
```javascript
type Sheet = {
  type: string,
  css: string,
  media?: string,
  support?: boolean,
  rehydration: number
}
```

### Example
```javascript
import { renderToSheetList } from 'fela-dom'
import { createRenderer } from 'fela'

const renderer = createRenderer()

const rule = ({ fontSize }) => ({
  fontSize: fontSize,
  color: 'blue',
  '@supports (display: flex)': {
    color: 'green'
  },
  '@media (min-width: 300px)': {
    color: 'red'
  }
})

renderer.renderStatic('html,body{box-sizing:border-box;margin:0}')
renderer.renderRule(rule, { fontSize: '12px' })

const sheetList = renderToSheetList(renderer)
```

The following list would be returned:
```javascript
[
  { type: 'STATIC', css: 'html,body{box-sizing:border-box;margin:0}', rehydration: 4 },
  { type: 'RULE', css: '.a{font-size:12px}.b{color:blue}', rehydration: 4 },
  { type: 'RULE', css: '.c{color:green}', support: true, rehydration: 4 },
  { type: 'RULE', css: '.d{color:red}', media: '(min-width: 300px)', rehydration: 4 },
]
```

### Using `renderer.rendererId`

If you decided to use the [`renderer.rendererId` option](../fela/Renderer.md) with rehydration you should ensure that
your `<style>` nodes have the matching `data-fela-id` attribute.

```javascript
import { createRenderer } from 'fela'
import { renderToSheetList } from 'fela-dom'

const serverRenderer = createRenderer({
  rendererId: 'OTHER'
})
const sheetList = renderToSheetList(serverRenderer)
```

```html
<style type="text/css" data-fela-id="OTHER"></style>
```

> Check the [renderToMarkup](renderToMarkup.md) output in order to correctly create custom `style` elements that can be rehydrated.
