# Plugins

We have learned that the renderer is the universal interface to render basic styles, but yet all it does it to cache and transform simple shape-conforming style objects into CSS markup. We do not have any fancy additional functionality such as auto-prefixing. That's where the built-in plugin system comes to the rescue!<br>
Plugins are functions that take a style object, alter its shape and return a new style object, which in most cases is the mutated input itself.
Before the resolved style object gets cached and transformed to CSS, it is piped through each plugin.

### Use Cases
They are especially helpful to automate certain aspects of styling such as auto-prefixing. They are also very handy to improve the developer experience e.g. by automatically adding a unit like `px` to dimension values.

### Order Matters
Your style objects get piped from left to right. Always remember that the plugin order sometimes matters as some plugins might depend on each other.


## Using Plugins
To use plugins we need to add them to the renderer configuration directly. You can do this by passing a configuration object with the `plugins` key while creating your renderer.

```javascript
import { createRenderer } from 'fela'

const config = {
  // It must be an array to be able
  // to pass multiple plugins
  plugins: [ /* your plugins */ ]
}

const renderer = createRenderer(config)
```

### Example

Lets say we want to automatically add vendor prefixes to all of our style objects. Luckily there is already a package called [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer) which does exactly that.
It turns out, to create the plugin we just need to create a function that takes our current styles and returns the prefixed styles. That's it.

```javascript
import prefixAll from 'inline-style-prefixer/static'
import { createRenderer } from 'fela'

const prefixerPlugin = styleObject => prefixAll(styleObject)

const config = {
  plugins: [ prefixerPlugin ]
}

const renderer = createRenderer(config)
```

## Configuration
Some advanced plugins might even have some options to configure it. The recommended way to do this is by wrapping the plugin itself in another function accepting those options.

### Example
For example if we do not want to use the static `inline-style-prefixer/static`, but rather the more advanced dynamic version, we need to pass at least the `userAgent`.


```javascript
import Prefixer from 'inline-style-prefixer'
import { createRenderer } from 'fela'

const prefixerPlugin = userAgent => {
  const prefixer = new Prefixer({ userAgent })
  return styleObject => prefixer.prefix(styleObject)
}

const config = {
  plugins: [ prefixerPlugin(navigator.userAgent) ]
}

const renderer = createRenderer(config)
```

## Official Plugins
Fela already ships with some official plugins. Check out [Introduction - Ecosystem](../introduction/Ecosystem.md#plugins) for more information.<br>
> **Note**: Official plugins are wrapped by a configuration function by default.

## Plugin Presets
In additional to each single plugin, we also provide plugin presets which should simplify the configuration process.<br>
Right now there are two different presets available, a basic web preset [fela-preset-web](https://github.com/rofrischmann/fela/tree/master/packages/fela-preset-web) and one development-only preset [fela-preset-dev](https://github.com/rofrischmann/fela/tree/master/packages/fela-preset-dev).


<br>

---

### Related
* [Renderer Configuration](RendererConfiguration.md)
* [List of plugins](../introduction/Ecosystem.md#plugins)
* [List of plugin presets](../introduction/Ecosystem.md#plugin-presets)
