# fela-plugin-extend

<img alt="npm version" src="https://badge.fury.io/js/fela-plugin-extend.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-extend.svg"> <a href="https://bundlephobia.com/result?p=fela-plugin-extend@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela-plugin-extend.svg"></a>

Allows styles to be extended with other style objects. Supports a condition-based API.<br>
It automatically removes `null` and `undefined` values **before** merging styles.

## Installation
```sh
yarn add fela-plugin-extend
```
You may alternatively use `npm i --save fela-plugin-extend`.

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
Documentation is licensed under [Creative Commons License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](http://weser.io) and all the great contributors.
