# FelaDOM API

* [MediaSelector(composer [, mediaComposer])](#mediaselectorcomposer--mediacomposer)
* [Renderer(node)](#renderernode)
  * [.render(selector [, props, plugins])](#renderselector--props-plugins)
  * [.clear()](#clear)

## `Renderer(node)`
**HTMLElement\<node>**<br>

Creates a new renderer bound to the DOM `node`. It caches rendered selector variations.<br>
The DOM `node` should be a valid HTMLElement, preferable an actual `<style>` element located within the `document.head`.

### `render(selector [, props, plugins])`
**Selector\<selector>**<br>
**Object?\<props>**<br>
**Function[]?\<plugins>**

Renders the given `selector` with a set of `props` into a the associated DOM node. Optionally processes rendered styles with some `plugins`.

It will return a reference `className` which is used to mount the styles to the node. Each className is generated from a unique selector reference ID as well as a content-based hash of the passed props - therefore each className is unique.
```javascript
const node = document.getElementById('style-element')
const renderer = new Renderer(node)

const selector = new Fela.Selector(props => ({ color: props.color }))

renderer.render(selector, { color: 'red' }) // => c0-se22d
renderer.render(selector, { color: 'blue' }) // => c0-ee414

// node.textContent === .c0-se22d{color:red}.c0-ee414{color:blue}
```
### Caching
To reduce redundant rendering cycles every rendered selector variation will get cached and reused for future render-calls. This also boosts performance of runtime rendering as a huge amount of variations can be reused and is therefore not rendered nor mounted to the DOM node again.

### `clear()`

Clears all styles rendered into the associated DOM node. This also clears all cached styles.
> Warning: Clearing a DOM node might prejudice the rendering performance of future rendering cycles.

```javascript
const node = document.getElementById('style-element')
const renderer = new Renderer(node)

const selector = new Fela.Selector(props => ({ color: props.color }))

renderer.render(selector, { color: 'red' }) // => c0-se22d
renderer.render(selector, { color: 'blue' }) // => c0-ee414

// node.textContent === .c0-se22d{color:red}.c0-ee414{color:blue}

renderer.clear()
// node.textContent === ''

```
