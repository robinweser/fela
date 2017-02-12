# fela-tools

A set of useful tools to work with Fela.

<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-tools.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.52kb-brightgreen.svg">

## Installation
```sh
npm i --save fela-tools
```
Assuming you are using [npm](https://www.npmjs.com) as your package manager you can just `npm install`.<br>
Otherwise we also provide a [UMD](https://github.com/umdjs/umd). You can easily use it via [unpkg](https://unpkg.com/). It registers a  `FelaTools` global.
```HTML
<!-- (Development) Unminified version -->
<script src="https://unpkg.com/fela-tools@4.2.2/dist/fela-tools.js"></script>
<!-- (Production) Minified version -->
<script src="https://unpkg.com/fela-tools@4.2.2/dist/fela-tools.min.js"></script>
```

## Usage
The provided API is provided by the `fela-tools` package by default e.g.

```javascript
import { StyleSheet } from 'fela-tools'
```

In addition to that, we also support per module imports to only import a specific tool *(which, without tree shaking, saves bundle size)*

```javascript
import StyleSheet from 'fela-tools/StyleSheet'
```

## API Reference

* [`mapValueToMediaQuery(queryValueMap, mapper)`](docs/mapValueToMediaQuery.md)
* [StyleSheet](docs/StyleSheet.md)

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
