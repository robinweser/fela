# fela-plugin-placeholder-prefixer


<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-placeholder-prefixer.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.50kb-brightgreen.svg">

Adds prefixes to `::placeholder` pseudo elements.

## Installation
```sh
npm i --save fela-plugin-placeholder-prefixer
```
Assuming you are using [npm](https://www.npmjs.com) as your package mananger you can just `npm install`.<br>
Otherwise we also provide a [UMD](https://github.com/umdjs/umd). You can easily use it via [unpkg](https://unpkg.com/). It registers a `FelaPluginPlaceholderPrefixer` global.
```HTML
<!-- Fela (Development): Unminified version including all warnings -->
<script src="https://unpkg.com/fela-plugin-placeholder-prefixer@3.0.5/dist/fela-plugin-placeholder-prefixer.js"></script>
<!-- Fela (Production): Minified version -->
<script src="https://unpkg.com/fela-plugin-placeholder-prefixer@3.0.5/dist/fela-plugin-placeholder-prefixer.min.js"></script>
```

## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import placeholderPrefixer from 'fela-plugin-placeholder-prefixer'

const renderer = createRenderer({
  plugins: [ placeholderPrefixer() ]
})
```

## Example

#### Input
```javascript
{
  color: 'red',
  '::placeholder': {
    color: 'green'
  }
}
```
#### Output
```javascript
{
  color: 'red',
  '::-webkit-input-placeholder': {
    color: 'green'
  },
  '::-moz-placeholder': {
    color: 'green'
  },
  ':-ms-input-placeholder': {
    color: 'green'
  },
  ':-moz-placeholder': {
    color: 'green'
  }
  '::placeholder': {
    color: 'green'
  }
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
