# fela-plugin-rtl

<img alt="npm version" src="https://badge.fury.io/js/fela-plugin-rtl.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-rtl.svg">

Uses [rtl-css-js](https://github.com/kentcdodds/rtl-css-js) to convert a style object to its right-to-left counterpart.

## Installation
```sh
yarn add fela-plugin-rtl
```
You may alternatively use `npm i --save fela-plugin-rtl`.


## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import rtl from 'fela-plugin-rtl'

const renderer = createRenderer({
  plugins: [ rtl() ]
})
```

## Example

#### Input
```javascript
{
  paddingLeft: 20,
  marginRight: '25px',
  cursor: 'w',
  textShadow: 'red 2px 0'
}
```
#### Output
```javascript
{
  paddingRight: 20,
  marginleft: '25px',
  cursor: 'e',
  textShadow: 'red -2px 0'
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
