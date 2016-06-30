# fela-plugin-fallback-value


<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-fallback-value.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.56kb-brightgreen.svg">

Sometimes you want to provide alternative values also know as *fallback values*. <br>
For example in Internet Explorer 8 there is no `rgba` compatibility for colors which means just passing *e.g. `color: rgba(0, 0, 0, 0.5)`* would not be applied correctly.
By passing an array of values you can provide fallback values.

## Installation
```sh
npm i --save fela-plugin-fallback-value
```
Assuming you are using [npm](https://www.npmjs.com) as your package mananger you can just `npm install`.<br>
Otherwise we also provide a [UMD](https://github.com/umdjs/umd). You can easily use it via [npmcdn](https://npmcdn.com/). It registers a  `FelaPluginFallbackValue` global.
```HTML
<!-- Fela (Development): Unminified version including all warnings -->
<script src="https://npmcdn.com/fela-plugin-fallback-value@1.0.2/dist/fela-plugin-fallback-value.js"></script>
<!-- Fela (Production): Minified version -->
<script src="https://npmcdn.com/fela-plugin-fallback-value@1.0.2/dist/fela-plugin-fallback-value.min.js"></script>
```

## Example

#### Input
```javascript
{
  color: [ 'rgba(0, 0, 0, 0.5)', '#ccc']
}
```
#### Output
```javascript
{
  color: 'rgba(0, 0, 0, 0.5);color:#ccc'
}
```
which is similar to the following CSS code:
```CSS
{
	color: rgba(0, 0, 0, 0.5);
	color: #ccc
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
