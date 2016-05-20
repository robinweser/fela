# API

* [Selector(composer [, mediaComposer])](#selectorcomposer-mediacomposer)
* [.render(node, selector [, props, plugins])](#rendernode-selector-props-plugins)
* [.clear(node)](#clearnode)
* [.enhanceWithPlugins(selector, plugins)](#enhancewithpluginsselector-plugins)
  
## `Selector(composer [, mediaComposer])`
**Function\<composer>**

Selectors build up the core of every DOM-based CSS environment. <br>
They are instantiated with at least a basic composer which is a pure function of dynamic properties that returns an object containing style declarations which provides the ability to render multiple variations of one single Selector.

Each composer function should be pure and return an object containing various style declarations. Properties are usually declared in camelCase notation, but do not neccessarily need to follow that convention. You may also use dash-case notation used with old traditional CSS.  

```javascript
const composer = props => ({
  // dynamic declarations may vary
  // depending on the props passed
  color: props.color,
  fontSize: props.fontSize,
  
  // you may also use dash-case notation
  'line-height': 1.4,

  // static declarations stay unchanged
  // independent of which props are passed
  display: 'flex'
})

const selector = new Fela.Selector(composer)
```

**Object?\<mediaComposer>**

An *optional* object of media composer is passed to specify how a Selector gets rendered in a given media environment. This basically implements media queries.
Each media composer is a key-value pair mapping a media query string to a *style composer*.

```javascript
const composer = props => ({
  color: props.color,
  fontSize: props.fontSize,
  display: 'flex'
})

const mediaComposer = {
  // styles that get applied if height has a
  // minimum of 300px
  'min-height: 300px': props => ({color: 'red'}),
  // those only get applied if width is under 401px
  'max-width: 400px': props => ({
    fontSize: 12,
    color: props.color
  })
}

const selector = new Fela.Selector(composer, mediaComposer)
```

#### Pseudo classes
Pseudo classes are a core feature of CSS and therefore not missed out as well. They can be nested inside the returned object.
```javascript
const selector = new Fela.Selector(props => ({
  color: props.color, 
  fontSize: '12px', 
  ':hover': {
    color: 'red',
    // they can also be nested to achieve
    // e.g. .className:hover:focus
    ':focus': {
      color: 'yellow'
    }
  }
}))
```

## `render(node, selector [, props, plugins])`
**HTMLElement\<node>**<br>
**Selector\<selector>**<br>
**Object?\<props>**<br>
**Function[]?\<plugins>**

Renders the given `selector` with a set of `props` into a DOM `node`. Optionally processes rendered styles with some `plugins`. In order to get your styles applied correctly, be sure to always use a valid element node - preferable an actual `<style>` located within the `document.head` element.

It will return a reference className which is used to mount the styles to the node. Each className is generated from a unique selector reference ID as well as a content-based hash of the passed props - therefore each className is unique.
```javascript
const selector = new Fela.Selector(props => ({ color: props.color }))
const node = document.getElementById('style-element')

Fela.render(node, selector, { color: 'red' }) // => c0-se22d
Fela.render(node, selector, { color: 'blue' }) // => c0-ee414

// node.textContent === .c0-se22d{color:red}.c0-ee414{color:blue}
``` 
### Caching
To reduce redundant rendering cycles every rendered selector variation will get cached and reused for future render-calls. This also boosts performance of runtime rendering as a huge amount of variations can be reused and is therefore not rendered nor mounted to the DOM node again.

## `clear(node)`
**HTMLElement\<node>**

Clears all styles rendered into a given DOM `node`. This also clears all cached styles associated with this `node`, but still keeps the cache bindings to be able to render into the `node` again.
> Warning: Clearing a DOM node might prejudice the rendering performance of future rendering cycles.

```javascript
const selector = new Fela.Selector(props => ({ color: props.color }))
const node = document.getElementById('style-element')

Fela.render(node, selector, { color: 'red' }) // => c0-se22d
Fela.render(node, selector, { color: 'blue' }) // => c0-ee414

// node.textContent === .c0-se22d{color:red}.c0-ee414{color:blue}

Fela.clear(node)
// node.textContent === ''

```

## `enhanceWithPlugins(selector, plugins)`
**Selector\<selector>**<br>
**Function[]\<plugins>**

Enhancing a `selector` will wrap its build in render in order to automatically invoke `plugins` on every future call. It will also merge additional plugins that might be passed to already enhanced Selectors. This also opens the ability to enhance a single Selector multiple times.
```javascript
const selector = new Fela.Selector(props => ({ color: props.color }))
const plugins = [ /* some plugins */ ]

const enhancedSelector = Fela.enhanceWithPlugins(selector, plugins)

// now you do not need to explicitly pass the plugins anymore
const renderedEnhanced = enhancedSelector.render({ color: 'red' })

// which is the same as
const renderedWithPlugins = selector.render({ color: 'red' }, plugins)
```