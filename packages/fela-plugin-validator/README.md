# fela-plugin-validator


<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-validator.svg"> <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.96kb-brightgreen.svg">

Enforces object validation for keyframes and rules.
Logs invalid properties to the `console`. One might also enable automatic property deletion.

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
### Configuration
##### Options
| Option | Value | Default | Description |
| --- | --- | --- | --- |
| `logInvalid` | *(boolean)* | `true` | logs invalid properties/values |
| `deleteInvalid` | *(boolean)* | `false` | deletes invalid properties/values |

##### Example
```javascript
import { createRenderer } from 'fela'
import validator from 'fela-plugin-validator'

const validatorPlugin = validator({
  logInvalid: true,
  deleteInvalid: true
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
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
