# Fela API

* [Selector(composer [, mediaComposer])](#selectorcomposer--mediacomposer)
* [enhanceWithPlugins(renderer, plugins)](#enhancewithpluginsrenderer-plugins)

## `Selector(composer [, mediaComposer])`
**Function\<composer>**

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
