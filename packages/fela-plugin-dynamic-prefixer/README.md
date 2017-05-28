# fela-plugin-dynamic-prefixer


<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-dynamic-prefixer.svg"> <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-10.29kb-brightgreen.svg">

Uses [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefix-all) to add vendor prefixes by evaluating the `userAgent`.

**Requires to use [fela-plugin-fallback-value](../fela-plugin-fallback-value/) afterwards** in order to resolve alternative prefix values which get returned as an array by default.

## Installation
```sh
npm i --save fela-plugin-dynamic-prefixer
```
Assuming you are using [npm](https://www.npmjs.com) as your package manager you can just `npm install`.<br>
Otherwise we also provide a [UMD](https://github.com/umdjs/umd). You can easily use it via [unpkg](https://unpkg.com/). It registers a `FelaPluginDynamicPrefixer` global.
```HTML
<!-- Fela (Development): Unminified version including all warnings -->
<script src="https://unpkg.com/fela-plugin-dynamic-prefixer@4.3.5/dist/fela-plugin-dynamic-prefixer.js"></script>
<!-- Fela (Production): Minified version -->
<script src="https://unpkg.com/fela-plugin-dynamic-prefixer@4.3.5/dist/fela-plugin-dynamic-prefixer.min.js"></script>
```

## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import dynamicPrefixer from 'fela-plugin-dynamic-prefixer'

const renderer = createRenderer({
  plugins: [ dynamicPrefixer() ]
})
```


### Configuration
It can be configured using the same options as [inline-style-prefixer's Prefixer](https://github.com/rofrischmann/inline-style-prefixer/blob/master/docs/API.md#configuration).

```javascript
import { createRenderer } from 'fela'
import dynamicPrefixer from 'fela-plugin-dynamic-prefixer'

const dynamicPrefixerPlugin = dynamicPrefixer({
  userAgent: navigator.userAgent,
  keepUnprefixed: true
})

const renderer = createRenderer({
  plugins: [ dynamicPrefixerPlugin ]
})
```

## Example
Assuming we are using e.g. Chrome 25.

#### Input
```javascript
{
  transition: '200ms all linear',
  userSelect: 'none',
  boxSizing: 'border-box',
  display: 'flex',
  color: 'blue'
}
```
#### Output
```javascript
{
  transition: '200ms all linear',
  WebkitUserSelect: 'none',
  boxSizing: 'border-box',
  display: '-webkit-flex',
  color: 'blue'
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
