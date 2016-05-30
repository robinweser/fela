# FelaServer API

* [Renderer()](#renderernode)
  * [.render(element [, props, plugins])](#renderelement--props-plugins)
  * [.renderToString()](#rendertostring)
  * [.clear()](#clear)

## `Renderer()`

Instantiates a new Server Renderer.
### `render(element [, props, plugins])`
**Function|Keyframe|FontFace|Object|string\<element>**<br>
**Object?\<props>**<br>
**Function[]?\<plugins>**

A universal method to render either selector & Keyframe variations, FontFaces or static styles. Optionally processes the variation with a set of  `plugins`. <br>
Returns the mounted *className*, *animationName* or *fontFamily* reference.
```javascript
const renderer = new FelaServer.Renderer()
const selector = props => ({ color: props.color }))

renderer.render(selector, { color: 'red' }) // => c0-se22d
renderer.render(selector, { color: 'blue' }) // => c0-ee414
```

### `renderToString()`

Renders all cached selector variations, Keyframes variations and FontFaces into a single CSS string.
```javascript
const renderer = new FelaServer.Renderer()
const selector = props => ({ color: props.color }))

renderer.render(selector, { color: 'red' }) // => c0-se22d
renderer.render(selector, { color: 'blue' }) // => c0-ee414

const css = renderer.renderToString() // => .c0-se22d{color:red}.c0-ee414{color:blue}
```

### `clear()`
Clears all cached selector variations, Keyframe variations and FontFaces.
```javascript
const renderer = new FelaServer.Renderer()
const selector = props => ({ color: props.color }))

renderer.render(selector, { color: 'red' }) // => c0-se22d
renderer.render(selector, { color: 'blue' }) // => c0-ee414

renderer.clear()
```
