# fela-perf

<img alt="npm version" src="https://badge.fury.io/js/fela-perf.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-perf.svg"> <a href="https://bundlephobia.com/result?p=fela-perf@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela-perf.svg"></a>

Performance devTool to be used with Fela. It logs elapsed time during render cycles.

## Installation
```sh
yarn add fela-perf
```
You may alternatively use `npm i --save fela-perf`.

## Usage
```javascript
import { createRenderer } from 'fela'
import perf from 'fela-perf'

const renderer = createRenderer({
  enhancers: [ perf() ]
})
```

## Example
<img width="400" src="preview.png">

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](http://weser.io) and all the great contributors.
