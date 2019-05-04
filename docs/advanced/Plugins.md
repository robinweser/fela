# Plugins

We have learned that the renderer is the universal interface to render basic styles, but yet all it does is cache and transform simple shape-conforming style objects into CSS markup. We do not have any fancy additional functionality such as auto-prefixing. That's where the built-in plugin system comes to the rescue!<br>
Plugins are functions that take a style object, alter its shape and return a new style object, which in most cases is the mutated input itself.
Before the resolved style object gets cached and transformed to CSS, it is piped through each plugin.

### Use Case
They are especially helpful to automate certain aspects of styling such as auto-prefixing. They are also very handy to improve the developer experience e.g. by automatically adding a unit like `px` to dimension values.

## Using Plugins
To use plugins we need to add them to the renderer configuration directly. You can do this by passing a configuration object using the `plugins` key while creating your renderer.

```javascript
import { createRenderer } from 'fela'

const config = {
  plugins: [
    /* your plugins */
  ]
}

const renderer = createRenderer(config)
```

Fela already ships with tons of plugins. Check out [Introduction - Ecosystem](../introduction/Ecosystem.md#plugins) for more information. Every plugin is published as a separate package and includes documentation on what it does and how it is used.

#### Presets
In additional to each single plugin, we also provide plugin presets which should simplify the configuration process.<br>
Right now there are two different presets available, a basic web preset [fela-preset-web](https://github.com/rofrischmann/fela/tree/master/packages/fela-preset-web) and one development-only preset [fela-preset-dev](https://github.com/rofrischmann/fela/tree/master/packages/fela-preset-dev).

### Order Matters
Plugins are executed in the exact same order as provided. The output of the first plugin is passed to the second plugin and so on. Keep in mind that some plugins need to be executed before or after another. To be safe, stick to the following order:

1. [fela-plugin-extend](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-extend)
2. [fela-plugin-custom-property](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-custom-property)
3. [fela-plugin-embedded](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-embedded)
4. [fela-plugin-friendly-pseudo-class](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-friendly-pseudo-class)
5. [fela-plugin-named-keys](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-named-keys)
6. [fela-plugin-placeholder-prefixer](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-placeholder-prefixer)
7. [fela-plugin-prefixer](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-prefixer)
8. [fela-plugin-fallback-value](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-fallback-value)
9. [fela-plugin-bidi](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-bidi)
10. [fela-plugin-rtl](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-rtl)
11. [fela-plugin-unit](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-unit)
12. [fela-plugin-important](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-important)
13. [fela-plugin-isolation](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-isolation)
14. [fela-plugin-validator](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-validator)
15. [fela-plugin-logger](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-logger)


## Custom Plugins

In order to learn how to write custom plugins, we first need to learn te exact API. A plugin is basically just a pure function that takes a style object and returns a (transformed) style object.

In addition to the input style object, it also receives some extra information:
```javascript
const plugin = (style, type, renderer, props) => processedStyle
```

##### Parameter
1. `style` (*Object*): The input style object
2. `type` (*string*): A type enum `RULE`, `KEYFRAME` or `STATIC`
3. `renderer` ([*Renderer*](../basics/Renderer.md)): The fela renderer
4. `props` (*Object*): The props used to resolve the rule

##### Returns
(*Object*) a transformed style object

### Example
Let's take a very simple example. Assume we want to add `display:none` to all rules that have the `hidden` prop.

```javascript
function hiddenPlugin (style, type, renderer, props) {
  if (props.hidden) {
    style.display = 'none'
  }

  return style
}
```
And that's it! Now every time you we call `renderer.renderRule(style, { hidden: true })` the `display:none` is automatically added to the style object.


### Configuration

Sometimes your plugin requires some configuration.<br>
To achieve this, you may create a plugin factory.<br>
Let's say we want to configure the prop that adds `display:none`.
```javascript
function hiddenPluginFactory (name) {
  return (style, type, renderer, props) => {
    if (props[name]) {
      style.display = 'none'
    }

    return style
  }
}
```
```javascript
const hiddenPlugin = hiddenPluginFactory('hideIt')
```
Now instead of passing `{ hidden: true }` we must pass `{ hideIt: true }`.

<br>

---

### Related
* [Renderer Configuration](RendererConfiguration.md)
* [List of plugins](../introduction/Ecosystem.md#plugins)
* [List of plugin presets](../introduction/Ecosystem.md#plugin-presets)
