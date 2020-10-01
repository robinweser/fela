# fela-plugin-pseudo-prefixer

<img alt="npm version" src="https://badge.fury.io/js/fela-plugin-pseudo-prefixer.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-pseudo-prefixer.svg"> <a href="https://bundlephobia.com/result?p=fela-plugin-pseudo-prefixer@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela-plugin-pseudo-prefixer.svg"></a>

Adds prefixes to pseudo elements and classes.

## Installation
```sh
yarn add fela-plugin-pseudo-prefixer
```
You may alternatively use `npm i --save fela-plugin-pseudo-prefixer`.


## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import pseudoPrefixer from 'fela-plugin-pseudo-prefixer'

const renderer = createRenderer({
  plugins: [ pseudoPrefixer(':fullscreen', [
    ':-webkit-full-screen',
    ':-moz-full-screen',
    ':-ms-fullscreen',
    ':full-screen',
    ':fullscreen',
  ])
})
```

## Example

#### Input
```javascript
{
  color: 'red',
  ':fullscreen': {
    color: 'green'
  }
}
```
#### Output
```javascript
{
  color: 'red',
  ':-webkit-full-screen': {
    color: 'green',
  },
  ':-moz-full-screen': {
    color: 'green',
  },
  ':-ms-fullscreen': {
    color: 'green',
  },
  ':full-screen': {
    color: 'green',
  },
  ':fullscreen': {
    color: 'green',
  },
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](http://weser.io) and all the great contributors.
