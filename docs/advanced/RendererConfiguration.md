# Renderer Configuration

We already learned that the renderer is configurable with e.g. [plugins](../advanced/Plugins.md), but there are some more options.

In general, our renderer accepts a config object. The following table shows each configuration option, its expected value, its default value and what it is used for.

We might introduce more configuration options with future releases, so be sure to frequently check for updates.

| Option | Value | Default | Description |
| ------ | ------ | ---------|---|
| plugins | *(Array?)* |  | A list of [plugins](../advanced/Plugins.md) to process styles before rendering |
| keyframePrefixes | *(Array?)* |`['-webkit-',`<br>`'-moz-']` | A list of which additional `@keyframes` prefixes are rendered |
| enhancers  | *(Array?)* |  |  A list of [enhancers](../advanced/Enhancers.md) to enhance the renderer
| mediaQueryOrder | *(Array?)* |  | An explicit order in which `@media` queries are rendered |
| rendererId | *(string?)* |  | An optional unique identifier that will prefix your animation names and will be added as the value of a `data-fela-id` attribute on `<style>` nodes. |
| supportQueryOrder | *(Array?)* |  | An explicit order in which `@supports` queries are rendered |
| selectorPrefix | *(string?)* |  | Prepend a static prefix to every generated class and keyframe. It must only consist of `a-zA-Z0-9-_` and start with `a-zA-Z_`. |
| filterClassName | *(Function?)* | `cls => cls.indexOf('ad') !== -1` | Filter-function to filter used class names |
| devMode | *(Boolean?)* | `false` | Enabling development mode for better developer experience. **Make sure to disable devMode in production.** |

## Example
```javascript
import { createRenderer } from 'fela'

import prefixer from 'fela-plugin-prefixer'
import unit from 'fela-plugin-unit'
import fallbackValue from 'fela-plugin-fallback-value'

import beautifier from 'fela-beautifier'

import { renderToString } from 'fela-dom'

const config = {
  plugins: [ unit('em'), prefixer(), fallbackValue() ],
  keyframePrefixes: ['-webkit-'],
  enhancers: [ beautifer() ],
  mediaQueryOrder: [
    '(min-height: 300px)',
    '(min-height: 500px)'
  ],
  selectorPrefix: 'fela_',
  devMode: process.env.NODE_ENV !== 'production'
}

const renderer = createRenderer(config)

const keyframe = props => ({
  from: {
    width: 'calc(100% - 50px)',
    height: props.height *  2
  },
  to: {
    width: 'calc(50% - 50px)',
    height: props.height
  }
})

const rule = props => ({
  color: props.color,
  fontSize: 12
})

renderer.renderRule(rule, { color: 'red '})
renderer.renderKeyframe(keyframe, { height: 100 })

console.log(renderToString(renderer))
```
```CSS
@-webkit-keyframes fela_k1 {
  from {
    width: -webkit-calc(100% - 50px);
    width: -moz-calc(100% - 50px);
    width: calc(100% - 50px);
    height: 200em
  }

  to {
    width: -webkit-calc(50% - 50px);
    width: -moz-calc(50% - 50px);
    width: calc(50% - 50px);
    height: 100em
  }
}

@keyframes fela_k1 {
  from {
    width: -webkit-calc(100% - 50px);
    width: -moz-calc(100% - 50px);
    width: calc(100% - 50px);
    height: 200em
  }

  to {
    width: -webkit-calc(50% - 50px);
    width: -moz-calc(50% - 50px);
    width: calc(50% - 50px);
    height: 100em
  }
}

.fela_a {
  color: red
}

.fela_b {
  font-size: 12px
}
```

<br>

---

### Related
* [Plugins](Plugins.md)
* [Enhancers](Enhancers.md)
* [API Reference - `createRenderer`](../api/fela/createRenderer.md)
