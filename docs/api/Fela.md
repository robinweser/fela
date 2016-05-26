# Fela API

* [Selector(composer)](#selectorcomposer)
* [enhanceWithPlugins(renderer, plugins)](#enhancewithpluginsrenderer-plugins)

## `Selector(composer)`
**Function\<composer>**

```javascript
const composer = props => ({
  color: props.color,
  fontSize: props.fontSize,
  lineHeight: 1.4,
  display: 'flex'
})

const selector = new Fela.Selector(composer)
```


## `enhanceWithPlugins(renderer, plugins)`
**Renderer\<renderer>**<br>
**Function[]\<plugins>**

```javascript
const selector = new Fela.Selector(props => ({ color: props.color }))
const plugins = [ /* some plugins */ ]

const renderer = new FelaDOM.Renderer(mountNode)
const enhancedRenderer = Fela.enhanceWithPlugins(renderer, plugins)

enhancedRenderer.render(selector, { color: 'red' })

```
