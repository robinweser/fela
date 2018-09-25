# fela-combine-arrays

> Deprecated!<br>The combine arrays enhancer is deprecated, please remove it from your Fela configuration.<br>It is obsolete as [css-in-js-utils](https://github.com/rofrischmann/css-in-js-utils)' [assignStyle](https://github.com/rofrischmann/css-in-js-utils#assignstylebase-extend) now combines arrays by default.

<img alt="npm version" src="https://badge.fury.io/js/fela-combine-arrays.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-combine-arrays.svg">

Enables merging array values when combining rules.<br>
This is especially useful if you want to deeply merge extend arrays using [fela-plugin-extend](../fela-plugin-extend).

## Installation
```sh
yarn add fela-combine-arrays
```
You may alternatively use `npm i --save fela-combine-arrays`.

## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import combineArrays from 'fela-combine-arrays'

const renderer = createRenderer({
  enhancers: [ combineArrays() ]
})
```

### Configuration
To only merge a specific set of property values, you may pass an array of properties.

##### Example
```javascript
import { createRenderer } from 'fela'
import combineArrays from 'fela-combine-arrays'

const combineArrayEnhancer = combineArrays(['extend'])

const renderer = createRenderer({
  enhancers: [ combineArrayEnhancer ]
})
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
