# fela-plugin-placeholder-prefixer

<img alt="npm version" src="https://badge.fury.io/js/fela-plugin-placeholder-prefixer.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-placeholder-prefixer.svg"> <a href="https://bundlephobia.com/result?p=fela-plugin-placeholder-prefixer@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela-plugin-placeholder-prefixer.svg"></a>

Adds prefixes to `::placeholder` pseudo elements.

## Installation
```sh
yarn add fela-plugin-placeholder-prefixer
```
You may alternatively use `npm i --save fela-plugin-placeholder-prefixer`.


## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import placeholderPrefixer from 'fela-plugin-placeholder-prefixer'

const renderer = createRenderer({
  plugins: [ placeholderPrefixer() ]
})
```

## Example

#### Input
```javascript
{
  color: 'red',
  '::placeholder': {
    color: 'green'
  }
}
```
#### Output
```javascript
{
  color: 'red',
  '::-webkit-input-placeholder': {
    color: 'green'
  },
  '::-moz-placeholder': {
    color: 'green'
  },
  ':-ms-input-placeholder': {
    color: 'green'
  },
  ':-moz-placeholder': {
    color: 'green'
  }
  '::placeholder': {
    color: 'green'
  }
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
