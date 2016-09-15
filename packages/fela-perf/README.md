# fela-perf

<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-perf.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.40kb-brightgreen.svg">

Performance devTool to be used with Fela. It logs elapsed time during render cycles.

## Installation
```sh
npm i --save fela-perf
```
Assuming you are using [npm](https://www.npmjs.com) as your package mananger you can just `npm install`.<br>
Otherwise we also provide a [UMD](https://github.com/umdjs/umd). You can easily use it via [unpkg](https://unpkg.com/). It registers a  `FelaPerf` global.>
```HTML
<!-- Fela (Development): Unminified version including all warnings -->
<script src="https://unpkg.com/fela-perf@1.2.0/dist/fela-perf.js"></script>
<!-- Fela (Production): Minified version -->
<script src="https://unpkg.com/fela-perf@1.2.0/dist/fela-perf.min.js"></script>
```

## Example
<img width="400" src="preview.png">

## Usage
```javascript
import { createRenderer } from 'fela'
import perf from 'fela-perf'

const renderer = createRenderer({ enhancers: [perf] })
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
