# fela-progressive

<img alt="npm version" src="https://badge.fury.io/js/fela-progressive.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-progressive.svg">

Enables progressive style rendering when using the `createComponent`-HoC provided by  [react-fela](../react-fela), [preact-fela](../preact-fela) and [inferno-fela](../inferno-fela).

## Installation
```sh
yarn add fela-progressive
```
You may alternatively use `npm i --save fela-progressive`.

## Usage
Make sure to read the documentation on [how to use enhancers](http://fela.js.org/docs/advanced/Enhancers.html).

```javascript
import { createRenderer } from 'fela'
import progressive from 'fela-progressive'

const renderer = createRenderer({
  enhancers: [ progressive() ]
})
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
