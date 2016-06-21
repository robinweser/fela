# fela-plugin-prefixer


<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-prefixer.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-2.94kb-brightgreen.svg">

Uses [inline-style-prefix-all](https://github.com/rofrischmann/inline-style-prefix-all) to add vendor prefixes to both property and value.

**Requires to use  [fela-plugin-fallback-value](../fela-plugin-fallback-value/) afterwards** in order to resolve alternative prefix values which get returned as an array by default.

## Installation
```sh
npm i --save fela-plugin-prefixer
```
Assuming you are using [npm](https://www.npmjs.com) as your package mananger you can just `npm install`.<br>
Otherwise we also provide a [UMD](https://github.com/umdjs/umd). You can easily use it via [npmcdn](https://npmcdn.com/). It registers a  `FelaPluginPrefixer` global.
```HTML
<!-- Fela (Development): Unminified version including all warnings -->
<script src="https://npmcdn.com/fela-plugin-prefixer@1.0.0-beta.2/dist/fela-plugin-prefixer.js"></script>
<!-- Fela (Production): Minified version -->
<script src="https://npmcdn.com/fela-plugin-prefixer@1.0.0-beta.2/dist/fela-plugin-prefixer.min.js"></script>
```

## Example

#### Input
```javascript
{
  display: 'flex',
  appearance: 'none'
}
```
#### Output
```javascript
{
  display: ['webkit-box', '-moz-box', '-ms-flexbox', '-webkit-flex', 'flex'],
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  appearance: 'none'
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
