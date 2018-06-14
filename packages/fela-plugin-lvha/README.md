> **Deprecated!**<br>The LVHA plugin (fela-plugin-lvha) is deprecated, please remove it from your Fela configuration.<br>
It is obsolete as sorting is now handled by the renderer itself. See https://github.com/rofrischmann/fela/pull/573
  
# fela-plugin-lvha

<img alt="npm version" src="https://badge.fury.io/js/fela-plugin-lvha.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-lvha.svg">

LVHA (sometimes known as LVHFA) stands for **L**ink **V**isited **H**over (**F**ocus) **A**ctive which are actually describe pseudo classes. Within CSS their order is relevant which means we always need to sort them correctly. This plugin **does** include the `:focus` pseudo class as well.

## Installation
```sh
yarn add fela-plugin-lvha
```
You may alternatively use `npm i --save fela-plugin-lvha`.


## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import LVHA from 'fela-plugin-lvha'

const renderer = createRenderer({
  plugins: [ LVHA() ]
})
```

## Example
#### Input
```javascript
{
  width: '25px',
  ':hover': {
    color: 'red'
  },
  ':visited': {
    color: 'gray'
  }
  ':link': {
    margin: 0
  }
}
```
#### Output
```javascript
{
  width: '25px',
  ':link': {
    margin: 0
  },
  ':visited': {
    color: 'gray'
  },
  ':hover': {
    color: 'red'
  }
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
