# fela-plugin-embedded

<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-embedded.svg"> <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.52kb-brightgreen.svg">

This plugins allows the use of inline keyframes and font-faces. It directly resolves them while rendering and only returns the correct reference.

## Installation
```sh
npm i --save fela-plugin-embedded
```
Assuming you are using [npm](https://www.npmjs.com) as your package manager you can just `npm install`.<br>
Otherwise we also provide a [UMD](https://github.com/umdjs/umd). You can easily use it via [unpkg](https://unpkg.com/). It registers a `FelaPluginEmbedded` global.
```HTML
<!-- Fela (Development): Unminified version including all warnings -->
<script src="https://unpkg.com/fela-plugin-embedded@4.3.5/dist/fela-plugin-embedded.js"></script>
<!-- Fela (Production): Minified version -->
<script src="https://unpkg.com/fela-plugin-embedded@4.3.5/dist/fela-plugin-embedded.min.js"></script>
```

## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import embedded from 'fela-plugin-embedded'

const renderer = createRenderer({
  plugins: [ embedded() ]
})
```

## Example
#### Input
```javascript
{
  width: '25px',
  animationName: {
    '0%': { color: 'red ' },
    '100%': { color: 'blue' }
  },
  fontFace: {
    fontFamily: 'Arial',
    src: [
      '../Arial.svg',
      '../Arial.ttf'
    ]
  }
}
```
#### Output
```javascript
{
  width: '25px',
  animationName: 'k1',
  fontFamily: 'Arial'
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
