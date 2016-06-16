# `enhance(...enhancers)`

Composes a renderer enhancer to enhance the basic `createRenderer` function.

## Arguments
1. `...enhancers` (*arguments*): Functions that enhance the basic renderer object. Each function takes the renderer and modifies its abilities.

## Returns
(*Function*): Renderer enhancer which is used to enhance the `createRenderer` function.

## Example
```javascript
import { createRenderer, enhance } from 'fela'
import logger from 'fela-logger'
import beautifier from 'fela-beautifier'

const mountNode = document.getElementById('stylesheet')

const enhancer = enhance(
  logger({ beautify: false }),
  beautifier()
)

const createEnhancedRenderer = enhancer(createRenderer)

const enhancedRenderer = createEnhancedRenderer(mountNode)
```
You may also directly apply the enhancer using the following short version.


```javascript
const createEnhancedRenderer = enhance(
  logger({ beautify: false }),
  beautifier()
)(createRenderer)

// or even shorter by directly creating the renderer
// but this is not very easy to read though
const renderer = enhance(
  logger({ beautify: false }),
  beautifier()
)(createRenderer)(mountNode)
```
