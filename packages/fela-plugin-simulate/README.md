# fela-plugin-simulate


<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-simulate.svg"> <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.49kb-brightgreen.svg">

This plugin can be used to quickly simulate nested style objects such as pseudo classes, media queries or attribute selectors.

## Installation
```sh
yarn add fela-plugin-simulate
```
You may alternatively use `npm i --save fela-plugin-simulate`.


## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import simulate from 'fela-plugin-simulate'

const renderer = createRenderer({
  plugins: [ simulate() ]
})
```

## Example

#### Input
```javascript
{
  color: 'red',

  '@media (min-height: 320px)': {
    color: 'green',
    backgroundColor: 'red'
  },
  ':hover': {
    color: 'blue'
  },
  ':active': {
    color: 'yellow'
  }
}
```

rendered with the following props
```javascript
{
  simulate: {
    ':hover': true,
    ':active': false,
    '@media (min-height: 320px)': true
  }
}
```

#### Output
```javascript
{
  backgroundColor: 'red',
  color: 'blue'
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
