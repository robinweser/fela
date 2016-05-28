# Fela API

* [Selector(composer)](#selectorcomposer)
* [MediaSelector(composer [, mediaComposers])](#mediaselectorcomposer--mediacomposers)
* [FontFace(family, files [, properties])](#fontfacefamily-files--properties)
* [Keyframe(keyframeComposer)](#keyframekeyframecomposer)
* [Renderer(node)](#renderernode)
  * [.render(selector [, props, plugins])](#renderselector--props-plugins)
  * [.clear()](#clear)

## `Selector(composer)`
**Function\<composer>**

Instantiates a new Selector with a pure style `composer`.

```javascript
const composer = props => ({
  color: props.color,
  fontSize: props.fontSize,
  lineHeight: 1.4,
  display: 'flex'
})

const selector = new Fela.Selector(composer)
```

## `MediaSelector(composer [, mediaComposers])`
**Function\<composer>**<br>
**Object\<mediaComposers>**

Instantiates a new MediaSelector with a basic style `composer` and an optional list of additional media style composer.
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

const mediaSelector = new Fela.MediaSelector(composer, mediaComposers)
```

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

Instantiates a new Keyframe with a pure keyframe *composer*. It is used similar to the basic [Selector](Fela.md#selectorcomposer).

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
**Function|Selector|MediaSelector|Keyframe|FontFace\<selector>**<br><br>
**Object?\<props>**<br>
**Function[]?\<plugins>**

Renders a specific Selector variation or Keyframe variation using `selector` and `props` and mounts the rendered CSS markup into the DOM node. Optionally processes the variation with a set of  `plugins`. Also renders FontFaces but without additional parameters.<br><br>
Returns the mounted *className* reference.
```javascript
const node = document.getElementById('style-element')
const renderer = new Fela.Renderer(node)

const selector = new Fela.Selector(props => ({ color: props.color }))

renderer.render(selector, { color: 'red' }) // => c0-se22d
renderer.render(selector, { color: 'blue' }) // => c0-ee414
```

### `clear()`

Clears the associated DOM node and all cached Selector variations.
```javascript
const node = document.getElementById('style-element')
const renderer = new Fela.Renderer(node)

const selector = new Fela.Selector(props => ({ color: props.color }))

renderer.render(selector, { color: 'red' }) // => c0-se22d
renderer.render(selector, { color: 'blue' }) // => c0-ee414

// node.textContent === .c0-se22d{color:red}.c0-ee414{color:blue}

renderer.clear()
// node.textContent === ''

```
