# fela-plugin-fullscreen-prefixer

<img alt="npm version" src="https://badge.fury.io/js/fela-plugin-fullscreen-prefixer.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-fullscreen-prefixer.svg"> <a href="https://bundlephobia.com/result?p=fela-plugin-fullscreen-prefixer@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela-plugin-fullscreen-prefixer.svg"></a>

Adds prefixes to `:fullscreen` pseudo class.

## Installation
```sh
yarn add fela-plugin-fullscreen-prefixer
```
You may alternatively use `npm i --save fela-plugin-fullscreen-prefixer`.


## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import fullscreenPrefixer from 'fela-plugin-fullscreen-prefixer'

const renderer = createRenderer({
  plugins: [ fullscreenPrefixer() ]
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
