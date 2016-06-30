# fela-plugin-unit


<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-unit.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-1.08kb-brightgreen.svg">

Always writing length values as string with a value applied seems not like the JavaScript way to do it. You can also use mathematics to process number values. <br>
It is aware of unitless properties such as `lineHeight` and also adds units to multiple values inside an array.

## Installation
```sh
npm i --save fela-plugin-unit
```
Assuming you are using [npm](https://www.npmjs.com) as your package mananger you can just `npm install`.<br>
Otherwise we also provide a [UMD](https://github.com/umdjs/umd). You can easily use it via [npmcdn](https://npmcdn.com/). It registers a  `FelaPluginUnit` global.
```HTML
<!-- Fela (Development): Unminified version including all warnings -->
<script src="https://npmcdn.com/fela-plugin-unit@1.0.2/dist/fela-plugin-unit.js"></script>
<!-- Fela (Production): Minified version -->
<script  src="https://npmcdn.com/fela-plugin-unit@1.0.2/dist/fela-plugin-unit.min.js"></script>
```

## Example
Let's say we want to have a custom property `size` that accepts a single number which will then be transformed into both `width` and `height` with a `px` unit applied.

#### Input
```javascript
{
  width: 25,
  lineHeight: 1.4,
  height: '53'
}
```
#### Output
```javascript
{
  width: '25px',
  lineHeight: 1.4,
  height: '53px'
}
```
## Configuration

By default it adds `px` to the value, but you may use units other than that.
```javascript
import unit from 'fela-plugin-unit'

const plugin = unit('em')
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
