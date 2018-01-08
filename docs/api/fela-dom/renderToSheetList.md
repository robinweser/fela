# `renderToSheetList(renderer)`

This advanced API is pretty similar to [`renderToMarkup`](renderToMarkup.md) as it also helps to render the renderer on the server.<br>
Instead of returning a single string of HTML containing style elements, it returns a list of so called style sheets.
Each style sheet contains everything we need to be able to render actual style elements on the server.

> Check the [`renderToMarkup`](renderToMarkup.md) output in order to correctly create custom `style` elements that can be rehydrated.

### Returns
(*Array*): List of style sheet objects

#### Shape
Every style sheet object has the following shape:
```javascript
type Sheet = {
  type: string,
  css: string,
  media?: string,
  support?: boolean
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
  '@supports (display: flex): {
    color: 'green'
  },
  '@media (min-width: 300px)': {
    color: 'red'
  }
})

renderer.renderStatic('html,body{box-sizing:border-box;margin:0}').
renderer.renderRule(rule, { fontSize: '12px' })

const sheetList = renderToSheetList(renderer)
```

The following list would be returned:
```javascript
[
  { type: 'STATIC', css: 'html,body{box-sizing:border-box;margin:0}' },
  { type: 'RULE', css: '.a{font-size:12px}.b{color:blue}' },
  { type: 'RULE', css: '.c{color:green}', support: true },
  { type: 'RULE', css: '.d{color:red}', media: '(min-width: 300px)' },
]
```