# fela-logger

<img alt="npm version" src="https://badge.fury.io/js/fela-logger.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-logger.svg"> <a href="https://bundlephobia.com/result?p=fela-logger@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela-logger.svg"></a>

Logging tool for Fela. Logs changes to the console, grouped by selector, animation name or font family.

## Installation
```sh
yarn add fela-logger
```
You may alternatively use `npm i --save fela-logger`.

## Usage
```javascript
import { createRenderer } from 'fela'
import logger from 'fela-logger'

const renderer = createRenderer({
  enhancers: [ logger() ]
})
```
### Configuration
##### Options
| Option | Value | Default | Description |
| --- | --- | --- | --- |
| `logCSS` | *(boolean)* | `false` | logs rendered CSS string |
| `formatCSS` | *(boolean)* | `false` |  logs formatted CSS strings<br>only together with `logCSS: true` |

##### Example
```javascript
import { createRenderer } from 'fela'
import logger from 'fela-logger'

const loggerEnhancer = logger({
  logCSS: true,
  formatCSS: true
})

const renderer = createRenderer({
  enhancers: [ loggerEnhancer ]
})
```

## Example
<img src="preview.png">

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](http://weser.io) and all the great contributors.
