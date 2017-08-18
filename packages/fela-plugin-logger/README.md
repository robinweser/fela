# fela-plugin-logger

<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-logger.svg"> <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.39kb-brightgreen.svg">

Logs processed styles to the `console` at a given point of processing.<br>
**Not to be confused with [fela-logger](../fela-logger)** which is used to render the real rendered output.

This plugin is intended to be used to debug style processing steps.

## Installation
```sh
yarn add fela-plugin-logger
```
You may alternatively use `npm i --save fela-plugin-logger`.


## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import logger from 'fela-plugin-logger'

const renderer = createRenderer({
  plugins: [ logger() ]
})
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
