# `enhance(...enhancers)`

Composes a renderer enhancer to enhance the basic `createRenderer` function. You can also [pass](../advanced/RendererConfiguration.md) `enhancers` to `createRenderer` directly which makes the use of `enhance` optional.

## Arguments
1. `...enhancers` (*arguments*): Functions that enhance the basic renderer object. Each function takes the renderer and modifies its abilities.

## Returns
(*Function*): Renderer enhancer which is used to enhance the `createRenderer` function.

## Example
```javascript
import { createRenderer, enhance } from 'fela'
import perf from 'fela-perf'
import beautifier from 'fela-beautifier'

const enhancer = enhance(
  perf(),
  beautifier()
)

const createEnhancedRenderer = enhancer(createRenderer)

const enhancedRenderer = createEnhancedRenderer()
```
You may also directly apply the enhancer using the following short version.


```javascript
const createEnhancedRenderer = enhance(
  perf(),
  beautifier()
)(createRenderer)

// or even shorter by directly creating the renderer
// but this is not very easy to read though
const renderer = enhance(
  perf(),
  beautifier()
)(createRenderer)()
```
