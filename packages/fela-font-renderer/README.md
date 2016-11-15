# fela-font-renderer

<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-font-renderer.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.40kb-brightgreen.svg">

Allocates all `renderFont` calls to a separate renderer which renders into a separate `mountNode` to prevent refetching the `@font-face` every time.

## Installation
```sh
npm i --save fela-font-renderer
```
Assuming you are using [npm](https://www.npmjs.com) as your package mananger you can just `npm install`.<br>
Otherwise we also provide a [UMD](https://github.com/umdjs/umd). You can easily use it via [unpkg](https://unpkg.com/). It registers a `FelaFontRenderer` global.
```HTML
<!-- Fela (Development): Unminified version including all warnings -->
<script src="https://unpkg.com/fela-font-renderer@3.0.6/dist/fela-font-renderer.js"></script>
<!-- Fela (Production): Minified version -->
<script src="https://unpkg.com/fela-font-renderer@3.0.6/dist/fela-font-renderer.min.js"></script>
```

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
