# Fela API

* [FontFace(family, files [, properties])](#fontfacefamily-files--properties)
* [Keyframe(keyframeComposer)](#keyframekeyframecomposer)
* [Renderer(node)](#renderernode)
  * [.render(selector [, props, plugins])](#renderselector--props-plugins)
  * [.clear()](#clear)
* [applyMiddleware(renderer, middleware)](#applymiddlewarerenderer-middleware)


## `FontFace(family, files [, properties])`
**string\<family>**<br>
**string[]\<files>**<br>
**Object?\<properties>**

Instantiates a new FontFace referencing a font `family` with a set of source `files` which are passed as relative paths. Optionally adds font-face specific style properties.

Valid properties are:
* `fontWeight`
* `fontStretch`
* `fontStyle`
* `unicodeRange`

```javascript
const files = [
  '../fonts/Arial.ttf',
  '../fonts/Arial.woff'
]

const fontFace = new Fela.FontFace('Arial', files, { fontWeight: 300 })
```

## `Keyframe(keyframeComposer)`
**Function\<keyframeComposer>**

Instantiates a new Keyframe with a pure keyframe *composer*. It is used similar to basic Selectors.

```javascript
const frameComposer = props => ({
  '0%': {
    color: 'red'
  },
  '50%': {
    color: 'blue'
  },
  '75%': {
    color: 'yellow'
  }
})

const keyframe = new Fela.Keyframe(frameComposer)
```


## `Renderer(node)`
**HTMLElement\<node>**<br>

Instantiates a new DOM Renderer and binds itself to a valid DOM `node`.

### `render(selector [, props, plugins])`
**Function|Keyframe|FontFace\<selector>**<br><br>
**Object?\<props>**<br>
**Function[]?\<plugins>**

Renders a specific Selector variation or Keyframe variation using `selector` and `props` and mounts the rendered CSS markup into the DOM node. Optionally processes the variation with a set of  `plugins`. Also renders FontFaces but without additional parameters.<br><br>
Returns the mounted *className* reference.
```javascript
const node = document.getElementById('style-element')
const renderer = new Fela.Renderer(node)

const selector = props => ({ color: props.color })

renderer.render(selector, { color: 'red' }) // => c0-se22d
renderer.render(selector, { color: 'blue' }) // => c0-ee414
```

### `clear()`

Clears the associated DOM node and all cached Selector variations.
```javascript
const node = document.getElementById('style-element')
const renderer = new Fela.Renderer(node)

const selector = props => ({ color: props.color }))

renderer.render(selector, { color: 'red' }) // => c0-se22d
renderer.render(selector, { color: 'blue' }) // => c0-ee414

// node.textContent === .c0-se22d{color:red}.c0-ee414{color:blue}

renderer.clear()
// node.textContent === ''
```

## `applyMiddleware(renderer, middleware)`
**Renderer\<renderer>**<br>
**Function[]?\<middleware>**

Helper to apply `middleware` to a Renderer instance.

```javascript
const renderer = new Fela.Renderer(node)

// example renderer that logs a text
// on every render call
const logger = options => {
  return renderer => {
    const existingRender = renderer.render.bind(renderer)
    renderer.render = (selector, props, plugins) => {
      console.log("Render has been called!")
      return existingRender(selector, props, plugins)
    }
  }
}

const enhancedRenderer = Fela.applyMiddleware(renderer, [ logger() ])
```
