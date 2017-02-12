# fela-plugin-remove-undefined


<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-remove-undefined.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.50kb-brightgreen.svg">

Removes any `undefined` value or string values containing `undefined`.
It also checks array values. This plugin has been used to ensure auto prefixing to work. It is not necessary anymore as Fela automatically strips all undefined values.

## Installation
```sh
npm i --save fela-plugin-remove-undefined
```
Assuming you are using [npm](https://www.npmjs.com) as your package manager you can just `npm install`.<br>
Otherwise we also provide a [UMD](https://github.com/umdjs/umd). You can easily use it via [unpkg](https://unpkg.com/). It registers a `FelaPluginRemoveUndefined` global.
```HTML
<!-- Fela (Development): Unminified version including all warnings -->
<script src="https://unpkg.com/fela-plugin-remove-undefined@4.2.2/dist/fela-plugin-remove-undefined.js"></script>
<!-- Fela (Production): Minified version -->
<script src="https://unpkg.com/fela-plugin-remove-undefined@4.2.2/dist/fela-plugin-remove-undefined.min.js"></script>
```


## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import removeUndefined from 'fela-plugin-remove-undefined'

const renderer = createRenderer({
  plugins: [ removeUndefined() ]
})
```


## Example

#### Input
```javascript
{
  color: 'blue',
  fontSize: undefined,
  border: 'undefinedpx solid blue',
  ':hover': {
    color: [ 'rgba(0, 0, 0, 0.4)', undefined, 'black' ]
  }
}
```
#### Output
```javascript
{
  color: 'blue',
  ':hover': {
    color: [ 'rgba(0, 0, 0, 0.4)', 'black' ]
  }
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
