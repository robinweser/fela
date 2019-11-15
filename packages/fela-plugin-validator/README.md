# fela-plugin-validator

<img alt="npm version" src="https://badge.fury.io/js/fela-plugin-validator.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-validator.svg"> <a href="https://bundlephobia.com/result?p=fela-plugin-validator@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela-plugin-validator.svg"></a>

Enforces object validation for keyframes and rules.<br>
Logs invalid properties to the `console`. <br>
If enabled, [csslint](https://github.com/CSSLint/csslint) is used to check the CSS.<br>
One might also enable automatic property deletion.

## Installation
```sh
yarn add fela-plugin-validator
```
You may alternatively use `npm i --save fela-plugin-validator`.


## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import validator from 'fela-plugin-validator'

const renderer = createRenderer({
  plugins: [ validator() ]
})
```

### Plugin ordering

Make sure that you place the validator plugin *at the end* of your plugins array - or else you may get some false error / validation messages.

### Configuration
##### Options
| Option | Value | Default | Description |
| --- | --- | --- | --- |
| logInvalid | *(boolean?)* | `true` | logs invalid properties/values |
| deleteInvalid | *(boolean?)* | `false` | deletes invalid properties/values |
| useCSSLint | *(boolean?)*<br>*(Object?)* | `false` | use CSSLint for style validation. <br> If an object is transferred, it will be interpreted as a set of rules for the validation (see [here](https://github.com/CSSLint/csslint/wiki/Rules)) |

##### Example
```javascript
import { createRenderer } from 'fela'
import validator from 'fela-plugin-validator'

const validatorPlugin = validator({
  logInvalid: true,
  deleteInvalid: true,
  useCSSLint: true
})

const renderer = createRenderer({
  plugins: [ validatorPlugin ]
})
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


## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](http://weser.io) and all the great contributors.
