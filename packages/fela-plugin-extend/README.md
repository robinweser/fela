# fela-plugin-extend


<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-extend.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.61kb-brightgreen.svg">

Allows styles to be extended with other style objects. Supports a condition-based API.

## Installation
```sh
npm i --save fela-plugin-extend
```
Assuming you are using [npm](https://www.npmjs.com) as your package manager you can just `npm install`.<br>
Otherwise we also provide a [UMD](https://github.com/umdjs/umd). You can easily use it via [unpkg](https://unpkg.com/). It registers a `FelaPluginExtend` global.
```HTML
<!-- Fela (Development): Unminified version including all warnings -->
<script src="https://unpkg.com/fela-plugin-extend@4.1.1/dist/fela-plugin-extend.js"></script>
<!-- Fela (Production): Minified version -->
<script src="https://unpkg.com/fela-plugin-extend@4.1.1/dist/fela-plugin-extend.min.js"></script>
```

## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import extend from 'fela-plugin-extend'

const renderer = createRenderer({
  plugins: [ extend() ]
})
```

## Example

### `extend: styleObject`
#### Input
```javascript
{
  color: 'red',
  extend: { backgroundColor: 'blue' }
}
```
#### Output
```javascript
{
  color: 'red',
  backgroundColor: 'blue'
}
```

### `extend: { condition, styleObject }`
#### Input
```javascript
{
  color: 'red',
  extend: {
    condition: props.bg === true,
    style: { backgroundColor: 'blue' }
  }
}
```
#### Output
Rendered using `{ bg: true }` as `props`:
```javascript
{
  color: 'red',
  backgroundColor: 'blue'
}
```
Rendered using `{ bg: false }` as `props`
```javascript
{
  color: 'red'
}
```

### `extend: [...]`
You can also mix basic and conditional extending.
It will extend the styles from left to right.
```javascript
{
  color: 'red',
  extend: [{
    fontSize: '12px',
    lineHeight: 1.5
  }, {
    condition: props.bg === true,
    style: { backgroundColor: 'blue' }
  }, {
    lineHeight: 1.2
  }]
}
```
#### Output
Using `{ bg: true }` as `props`:
```javascript
{
  color: 'red',
  fontSize: '12px',
  lineHeight: 1.2,
  backgroundColor: 'blue'
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
