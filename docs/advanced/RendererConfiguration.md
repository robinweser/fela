# Renderer Configuration

We already learned that the renderer is configurable with e.g. [plugins](../advanced/Plugins.md), but there are some more options.

In general, our renderer accepts a config object. The following table shows each configuration option, its expected value, its default value and what it is used for.

We might introduce more configuration options with future releases, so be sure to frequently check for updates.

| Option | Value | Default |Description |
| ------ | ------ | ---------|---|
|`plugins` | `function[]` |  | A list of [plugins](../advanced/Plugins.md) to process styles before rendering |
|`keyframePrefixes` |`string[]` |`['-webkit-',`<br>`'-moz-']` | A list of which additional `@keyframes` prefixes are rendered |
|`enhancers` | `function[]` |  |  A list of [enhancers](../advanced/Enhancers.md) to enhance the renderer
|`prettySelectors`<br>*(development only)* | `boolean` | `false`<br> *(always in production)*|  Renders class selectors based on the function name of the style rule. *e.g. `const menuBar = () => ({})` will output `menuBar__c1`*. |
|`mediaQueryOrder`| `string[]` | `[]`| An explicit order in which media query rules are rendered |

## Example
```javascript
import { createRenderer } from 'fela'

import prefixer from 'fela-plugin-prefixer'
import unit from 'fela-plugin-unit'
import fallbackValue from 'fela-plugin-fallback-value'

import beautifier from 'fela-beautifier'

const config = {
  plugins: [ unit('em'), prefixer(), fallbackValue() ],
  keyframePrefixes: ['-webkit-'],
  enhancers: [ beautifer() ],
  mediaQueryOrder: [
    '(min-height: 300px)',
    '(min-height: 500px)'
  ],
  prettySelectors: true
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

const prettyRule = props => ({
  color: 'red',
  '@media (min-height: 500px)': {
    color: 'green'
  },
  '@media (min-height: 300px)': {
    color: 'blue'
  }
})

renderer.renderKeyframe(keyframe, { height: 100 })
renderer.renderRule(prettyRule)

console.log(renderer.renderToString())
```
```CSS
@-webkit-keyframes k1 {
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

@keyframes k1 {
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

.prettyRule__c2 {
  color: red  
}

@media (min-height: 300px) {
  .prettyRule__c2 {
    color: blue
  }
}

@media (min-height: 500px) {
  .prettyRule__c2 {
    color: green  
  }
}
```

<br>

---

### Related
* [Plugins](Plugins.md)
* [Enhancers](Enhancers.md)
* [API reference - `createRenderer`](../api/createRenderer.md)
