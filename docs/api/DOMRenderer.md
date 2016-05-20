# DOM renderer

The DOM renderer ships the ability to actually render Selectors into a DOM node.

### Methods
* [.render(node, selector [, props, plugins])](#rendernode-selector-props-plugins)
* [.clear(node)](#clearnode)

## `render(node, selector [, props, plugins])`
**HTMLElement\<node>**<br>
**Selector\<selector>**<br>
**Object?\<props>**<br>
**Function[]?\<plugins>**

Renders the given `selector` with a set of `props` into a DOM `node`. Optionally processes rendered styles with some `plugins`. In order to get your styles applied correctly, be sure to always use a valid element node - preferable an actual `<style>` located within the `document.head` element.

It will return a reference className which is used to mount the styles to the node. Each className is generated from a unique selector reference ID as well as a content-based hash of the passed props - therefore each className is unique.
```javascript
const selector = new Selector(props => ({ color: props.color }))
const node = document.getElementById('style-element')

DOMRenderer.render(node, selector, { color: 'red' }) // => c0-se22d
DOMRenderer.render(node, selector, { color: 'blue' }) // => c0-ee414

// node.textContent === .c0-se22d{color:red}.c0-ee414{color:blue}
``` 
### Caching
To reduce redundant rendering cycles every rendered selector variation will get cached and reused for future render-calls. This also boosts performance of runtime rendering as a huge amount of variations can be reused and is therefore not rendered nor mounted to the DOM node again.

## `clear(node)`
**HTMLElement\<node>**

Clears all styles rendered into a given DOM `node`. This also clears all cached styles associated with this `node`, but still keeps the cache bindings to be able to render into the `node` again.
> Warning: Clearing a DOM node might prejudice the rendering performance of future rendering cycles.

```javascript
const selector = new Selector(props => ({ color: props.color }))
const node = document.getElementById('style-element')

DOMRenderer.render(node, selector, { color: 'red' }) // => c0-se22d
DOMRenderer.render(node, selector, { color: 'blue' }) // => c0-ee414

// node.textContent === .c0-se22d{color:red}.c0-ee414{color:blue}

DOMRenderer.clear(node)
// node.textContent === ''

```