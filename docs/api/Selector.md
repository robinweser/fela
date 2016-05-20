# Selector

Selectors build up the core of every DOM-based CSS environment. <br>
They are instantiated with at least a basic composer which is a pure function of dynamic properties that returns an object containing style declarations which provides the ability to render multiple variations of one single Selector.

### Methods
* [Selector](#selectorcomposer-mediacomposer)
  * [.render([props, plugins])](#renderprops-plugins)

## `Selector(composer [, mediaComposer])`
**Function\<composer>**

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

const selector = new Selector(composer)
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

const selector = new Selector(composer, mediaComposer)
```

### Pseudo classes
Pseudo classes are a core feature of CSS and therefore not missed out as well. They can be nested inside the returned object.
```javascript
const selector = new Selector(props => ({
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

### `render([props, plugins])`
**Object?\<props>**<br>
**Function[]?\<plugins>**

Rendering takes an object of `props` to resolve the style composer as well as each media composer. It *optionally* takes an array of `plugins` to process those styles.<br>
It returns an object with both rendered styles and media styles.
```javascript
const selector = new Selector(props => ({color: props.color}), {
  'min-height: 300px': props => ({ color: props.color === 'red' ? 'blue' : 'yellow' })
})

const rendered = selector.render({ color: 'red' })

rendered === {
  styles: { color: 'red' },
  // Note: mediaStyles is a Map, not a plain object
  mediaStyles: {
    'min-height: 300px' => { color: 'blue' }
  }
}
```