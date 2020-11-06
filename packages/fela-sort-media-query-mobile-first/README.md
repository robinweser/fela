# fela-sort-media-query-mobile-first

<img alt="npm version" src="https://badge.fury.io/js/fela-sort-media-query-mobile-first.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-sort-media-query-mobile-first.svg"> <a href="https://bundlephobia.com/result?p=fela-sort-media-query-mobile-first@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela-sort-media-query-mobile-first.svg"></a>

Uses [sort-css-media-queries](https://github.com/dutchenkoOleg/sort-css-media-queries) to sort you `mediaQueryOrder` following a mobile-first approach.

## Installation
```sh
yarn add fela-sort-media-query-mobile-first
```
You may alternatively use `npm i --save fela-sort-media-query-mobile-first`.

## Usage
```javascript
import { createRenderer } from 'fela'
import sortMediaQueryMobileFirst from 'fela-sort-media-query-mobile-first'

const renderer = createRenderer({
  enhancers: [ sortMediaQueryMobileFirst() ]
})
```



## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Commons License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@roWeser](http://roWeser.de) and all the great contributors.
