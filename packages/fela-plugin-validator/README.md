# fela-plugin-validator


<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-validator.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.8kb-brightgreen.svg">

Enforces object validation for keyframes and rules.
Logs invalid properties to the `console`. One might also enable automatic property deletion.

## Installation
```sh
npm i --save fela-plugin-validator
```
Assuming you are using [npm](https://www.npmjs.com) as your package mananger you can just `npm install`.<br>
Otherwise we also provide a [UMD](https://github.com/umdjs/umd). You can easily use it via [unpkg](https://unpkg.com/). It registers a `FelaPluginValidator` global.
```HTML
<!-- Fela (Development): Unminified version including all warnings -->
<script src="https://unpkg.com/fela-plugin-validator@1.2.0/dist/fela-plugin-validator.js"></script>
<!-- Fela (Production): Minified version -->
<script src="https://unpkg.com/fela-plugin-validator@1.2.0/dist/fela-plugin-validator.min.js"></script>
```

## Example
If the `deleteInvalid` option is enabled.

### Keyframe
#### Input
```javascript
{
  '0%': {
    color: 'red'
  },
  '101%': {
    color: 'blue'
  },
  color: 'blue'
}
```

#### Output
```javascript
{
  '0%': {
    color: 'red'
  }
}
```
### Rule
#### Input
```javascript
{
  color: 'red',
  ':hover': {
    color: 'green',
    foo: {
      color: 'blue'
    }
  },
  'nested': {
    color: 'yellow'
  }
}
```

#### Output
```javascript
{
  color: 'red',
  ':hover': {
    color: 'green',
  }
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
