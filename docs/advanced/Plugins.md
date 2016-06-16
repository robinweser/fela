# Plugins

We have learned that the renderer is the universal interface to render basic styles, but yet all it does it to cache and transform simple shape-conform style objects into CSS markup. We do not have any fancy additional functionality such as autoprefixing. That's where the built-in plugin system come for the rescue.<br>
Plugins are functions that take a style object, alert its shape and return a new style object, which in most cases is the mutated input itself.
Before the resolved style object gets cached and transformed to CSS, it is piped through each plugin.

### Use Cases
They are especially helpful to automate certain aspects of styling such as autoprefixing. Also they are used to improve the developer experience e.g. by automatically adding a unit e.g. `px` to length values.

## Using Plugins
To use plugins we need to add it to the renderer configuration directly. You can do this directly by passing a configuration object with the `plugins` key while creating your renderer.

```javascript
import { createRenderer } from 'fela'

const config = {
  // It must be an array to be able
  // to pass multiple plugins
  plugins: [ /* your plugins */ ]
}

const renderer = createRenderer(config)
```

### Order Matters
Your style objects get piped from left to right. Always remember that the plugin order sometimes matters as some plugins might depend on each other.

## Example
Lets say we want to automatically add vendor prefixes to all of our style objects. Luckily there already is a package called [inline-style-prefix-all](https://github.com/rofrischmann/inline-style-prefix-all) that adds all required vendor prefixes to your style object.<br>
It turns out, to create the plugin we just need to create a function that takes our current styles and returns the prefixed styles. That's it.

```javascript
import prefixAll from 'inline-style-prefix-all'
import { createRenderer } from 'fela'

const prefixerPlugin = styleObject => prefixAll(styleObject)

const config = {
  plugins: [ prefixerPlugin ]
}

const renderer = createRenderer(config)
```
