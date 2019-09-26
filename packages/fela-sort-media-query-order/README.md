# fela-sort-media-query-order

<img alt="npm version" src="https://badge.fury.io/js/fela-sort-media-query-order.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-sort-media-query-order.svg"> <a href="https://bundlephobia.com/result?p=fela-sort-media-query-order@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela-sort-media-query-order.svg"></a>

Uses [sort-css-media-queries](https://github.com/dutchenkoOleg/sort-css-media-queries) to sort you `mediaQueryOrder` following a mobile-first approach.

## Installation
```sh
yarn add fela-sort-media-query-order-order
```
You may alternatively use `npm i --save fela-sort-media-query-order`.

## Usage
```javascript
import { createRenderer } from 'fela'
import sortMediaQueryOrder from 'fela-sort-media-query-order'

const renderer = createRenderer({
  enhancers: [ sortMediaQueryOrder() ]
})
```



## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
