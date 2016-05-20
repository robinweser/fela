# Enhance Selectors with plugins

To avoid passing plugins on every render, one can enhance Selectors with a simple helper.

### Methods
* [enhanceWithPlugins(selector, plugins)](#enhancewithpluginsselector-plugins)

## `enhanceWithPlugins(selector, plugins)`
**Selector\<selector>**<br>
**Function[]\<plugins>**

Enhancing a `selector` will wrap its build in render in order to automatically invoke `plugins` on every future call. It will also merge additional plugins that might be passed to already enhanced Selectors. This also opens the ability to enhance a single Selector multiple times.
```javascript
const selector = new Selector(props => ({ color: props.color }))
const plugins = [ /* some plugins */ ]

const enhancedSelector = enhanceWithPlugins(selector, plugins)

// now you do not need to explicitly pass the plugins anymore
const renderedEnhanced = enhancedSelector.render({ color: 'red' })

// which is the same as
const renderedWithPlugins = selector.render({ color: 'red' }, plugins)
```
