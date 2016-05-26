# FelaDOMServer API

* [Renderer()](#renderernode)
  * [.render(selector [, props, plugins])](#renderselector--props-plugins)
  * [.renderToString()](#rendertostring)
  * [.clear()](#clear)

## `Renderer()`
### `render(selector [, props, plugins])`
**Function|Selector|MediaSelector\<selector>**<br>
**Object?\<props>**<br>
**Function[]?\<plugins>**

```javascript
const renderer = new FelaDOMServer.Renderer()
const selector = new Fela.Selector(props => ({ color: props.color }))

renderer.render(selector, { color: 'red' }) // => c0-se22d
renderer.render(selector, { color: 'blue' }) // => c0-ee414
```

### `renderToString()`

```javascript
const renderer = new FelaDOMServer.Renderer()
const selector = new Fela.Selector(props => ({ color: props.color }))

renderer.render(selector, { color: 'red' }) // => c0-se22d
renderer.render(selector, { color: 'blue' }) // => c0-ee414

const css = renderer.renderToString() // => .c0-se22d{color:red}.c0-ee414{color:blue}
```

### `clear()`

```javascript
const renderer = new FelaDOMServer.Renderer()
const selector = new Fela.Selector(props => ({ color: props.color }))

renderer.render(selector, { color: 'red' }) // => c0-se22d
renderer.render(selector, { color: 'blue' }) // => c0-ee414

renderer.clear()
```
