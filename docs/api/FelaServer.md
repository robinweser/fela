# FelaServer API

* [Renderer()](#renderernode)
  * [.render(selector [, props, plugins])](#renderselector--props-plugins)
  * [.renderToString()](#rendertostring)
  * [.clear()](#clear)

## `Renderer()`

Instantiates a new Server Renderer.
### `render(selector [, props, plugins])`
**Function|Selector|MediaSelector|Keyframe|FontFace\<selector>**<br>
**Object?\<props>**<br>
**Function[]?\<plugins>**

Silently renders a specific Selector variation or Keyframe variation using `selector` and `props` and mounts the rendered CSS markup into the DOM node. Optionally processes the variation with a set of  `plugins`. Also renders FontFaces but without additional parameters.<br><br>
Returns the mounted *className* reference.
```javascript
const renderer = new FelaServer.Renderer()
const selector = new Fela.Selector(props => ({ color: props.color }))

renderer.render(selector, { color: 'red' }) // => c0-se22d
renderer.render(selector, { color: 'blue' }) // => c0-ee414
```

### `renderToString()`

Renders all cached selector variations, Keyframes variations and FontFaces into a single CSS string.
```javascript
const renderer = new FelaServer.Renderer()
const selector = new Fela.Selector(props => ({ color: props.color }))

renderer.render(selector, { color: 'red' }) // => c0-se22d
renderer.render(selector, { color: 'blue' }) // => c0-ee414

const css = renderer.renderToString() // => .c0-se22d{color:red}.c0-ee414{color:blue}
```

### `clear()`
Clears all cached Selector variations, Keyframe variations and FontFaces.
```javascript
const renderer = new FelaServer.Renderer()
const selector = new Fela.Selector(props => ({ color: props.color }))

renderer.render(selector, { color: 'red' }) // => c0-se22d
renderer.render(selector, { color: 'blue' }) // => c0-ee414

renderer.clear()
```
