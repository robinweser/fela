# fela-sort-classnames

<img alt="npm version" src="https://badge.fury.io/js/fela-sort-classnames.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-sort-classnames.svg"> <a href="https://bundlephobia.com/result?p=fela-sort-classnames@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela-sort-classnames.svg"></a>

This enhancer makes sure that the rendered classnames are already ordered alphabetically. This helps to prevent mismatches with React and SSR on Safari due to differences in how objects are iterated.

## Installation
```sh
yarn add fela-sort-classnames
```
You may alternatively use `npm i --save fela-sort-classnames`.

## Usage
```javascript
import { createRenderer } from 'fela'
import sortClassNames from 'fela-sort-classnames'

const renderer = createRenderer({
  enhancers: [ sortClassNames() ]
})
```
## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Commons License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](http://weser.io) and all the great contributors.
