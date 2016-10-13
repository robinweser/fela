# fela-plugin-remove-undefined


<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-remove-undefined.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.46kb-brightgreen.svg">

Removes any `undefined` value or string values containing `undefined`.
It also checks array values.

## Installation
```sh
npm i --save fela-plugin-remove-undefined
```
Assuming you are using [npm](https://www.npmjs.com) as your package mananger you can just `npm install`.<br>
Otherwise we also provide a [UMD](https://github.com/umdjs/umd). You can easily use it via [unpkg](https://unpkg.com/). It registers a `FelaPluginRemoveUndefined` global.
```HTML
<!-- Fela (Development): Unminified version including all warnings -->
<script src="https://unpkg.com/fela-plugin-remove-undefined@3.0.0/dist/fela-plugin-remove-undefined.js"></script>
<!-- Fela (Production): Minified version -->
<script src="https://unpkg.com/fela-plugin-remove-undefined@3.0.0/dist/fela-plugin-remove-undefined.min.js"></script>
```

## Example

#### Input
```javascript
{
  color: 'blue',
  fontSize: undefined,
  border: 'undefinedpx solid blue',
  ':hover': {
    color: [ 'rgba(0, 0, 0, 0.4)', undefined, 'black' ]
  }
}
```
#### Output
```javascript
{
  color: 'blue',
  ':hover': {
    color: [ 'rgba(0, 0, 0, 0.4)', 'black' ]
  }
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
