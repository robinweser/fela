# fela-font-renderer

> Deprecated: With fela 5.0.0 this enhancer is no longer required as fela-dom now renders fonts into its own stylesheet.

<img alt="npm version" src="https://badge.fury.io/js/fela-font-renderer.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-font-renderer.svg">

Allocates all `renderFont` calls to a separate renderer which renders into a separate `mountNode` to prevent refetching the `@font-face` every time.

## Installation
```sh
yarn add fela-font-renderer
```
You may alternatively use `npm i --save fela-font-renderer`.

## Usage
### Configuration
##### Options
| Option | Value | Default | Description |
| ------ | --- | ------------ | --- |
|mountNode| *([HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement))* | | DOM node to render `@font-face` markup into |


##### Example
###### Client
Using the enhancer for client-side rendering can be achieved by simply passing another `mountNode` to the enhancer.
```javascript
import { createRenderer, render } from 'fela'
import fontRenderer from 'fela-font-renderer'

const mountNode = document.getElementById('font-stylesheet')
const fontEnhancer = fontRenderer(mountNode)

const renderer = createRenderer({
  enhancers: [ fontEnhancer ]
})
```

###### Server
To get the static CSS markup for both renderers can be achieved using the `renderer.fontRenderer` to generate the `@font-face` markup.

```javascript
import { createRenderer } from 'fela'
import fontRenderer from 'fela-font-renderer'

const renderer = createRenderer({
  enhancers: [ fontRenderer() ]
})

const CSS = renderer.renderToString()
const fontCSS = renderer.fontRenderer.renderToString()
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
