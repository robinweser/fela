# fela-plugin-important


<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-important.svg"> <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.52kb-brightgreen.svg">

Adds !important to every declaration value. This helps to force specificity over third-party libraries.

## Installation
```sh
npm i --save fela-plugin-important
```
Assuming you are using [npm](https://www.npmjs.com) as your package manager you can just `npm install`.<br>
Otherwise we also provide a [UMD](https://github.com/umdjs/umd). You can easily use it via [unpkg](https://unpkg.com/). It registers a `FelaPluginImportant` global.
```HTML
<!-- Fela (Development): Unminified version including all warnings -->
<script src="https://unpkg.com/fela-plugin-important@4.3.5/dist/fela-plugin-important.js"></script>
<!-- Fela (Production): Minified version -->
<script src="https://unpkg.com/fela-plugin-important@4.3.5/dist/fela-plugin-important.min.js"></script>
```

## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import important from 'fela-plugin-important'

const renderer = createRenderer({
  plugins: [ important() ]
})
```

## Example
#### Input
```javascript
{
  width: '25px',
  display: [ '-webkit-flex', 'flex' ],
  fontWeight: 'normal'
}
```
#### Output
```javascript
{
  width: '25px!important',
  display: [ '-webkit-flex!important', 'flex!important' ],
  fontWeight: 'normal!important'
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
