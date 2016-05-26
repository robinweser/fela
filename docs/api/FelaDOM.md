# FelaDOM API

* [MediaSelector(composer [, mediaComposers])](#mediaselectorcomposer--mediacomposers)
* [Renderer(node)](#renderernode)
  * [.render(selector [, props, plugins])](#renderselector--props-plugins)
  * [.clear()](#clear)

## `MediaSelector(composer [, mediaComposers])`
**Function\<composer>**<br>
**Object\<mediaComposers>**

```javascript
const composer = props => ({
  color: props.color,
  fontSize: props.fontSize + 'px',
  lineHeight: 1.4,
  display: 'flex'
})

const mediaComposers = {
  'min-height: 300px': props => ({
    color: 'red',
    fontSize: '14px'
  }),
  'max-width: 400px': props => ({
    color: 'blue',
    fontSize: props.fontSize * 2 + 'px'
  })
}

const mediaSelector = new FelaDOM.MediaSelector(composer, mediaComposers)
```

## `Renderer(node)`
**HTMLElement\<node>**<br>

### `render(selector [, props, plugins])`
**Function|Selector|MediaSelector\<selector>**<br>
**Object?\<props>**<br>
**Function[]?\<plugins>**

```javascript
const node = document.getElementById('style-element')
const renderer = new FelaDOM.Renderer(node)

const selector = new Fela.Selector(props => ({ color: props.color }))

renderer.render(selector, { color: 'red' }) // => c0-se22d
renderer.render(selector, { color: 'blue' }) // => c0-ee414
```

### `clear()`

```javascript
const node = document.getElementById('style-element')
const renderer = new FelaDOM.Renderer(node)

const selector = new Fela.Selector(props => ({ color: props.color }))

renderer.render(selector, { color: 'red' }) // => c0-se22d
renderer.render(selector, { color: 'blue' }) // => c0-ee414

// node.textContent === .c0-se22d{color:red}.c0-ee414{color:blue}

renderer.clear()
// node.textContent === ''

```
