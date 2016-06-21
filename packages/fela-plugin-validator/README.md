# fela-plugin-validator


<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-validator.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.57kb-brightgreen.svg">

Logs invalid properties to the `console`. One might also enable automatic property deletion.

## Installation
```sh
npm i --save fela-plugin-validator
```
Assuming you are using [npm](https://www.npmjs.com) as your package mananger you can just `npm install`.<br>
Otherwise we also provide a [UMD](https://github.com/umdjs/umd). You can easily use it via [npmcdn](https://npmcdn.com/). It registers a `FelaPluginValidator` global.
```HTML
<!-- Fela (Development): Unminified version including all warnings -->
<script src="https://npmcdn.com/fela-plugin-validator@1.0.0-beta.2/dist/fela-plugin-validator.js"></script>
<!-- Fela (Production): Minified version -->
<script src="https://npmcdn.com/fela-plugin-validator@1.0.0-beta.2/dist/fela-plugin-validator.min.js"></script>
```

## Example
If the `deleteInvalid` option is enabled.

#### Input
```javascript
{
  fontSize: undefined,
  color: 'red',
  padding: '20px undefined 0px'
}
```

#### Output
```javascript
{
  color: 'red'
}
```

## Configuration
The validator plugin uses two different option flags to enable/disable features.

```javascript
import validator from 'fela-plugin-validator'

const plugin = validator({
  // Will log invalid properties as well as
  // the value assigned to, default: true
  logInvalid: true,
  // Will automatically delete invalid
  // properties, default: false
  deleteInvalid: true
})
```


## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
