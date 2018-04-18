# fela-preset-dev

<img alt="npm version" src="https://badge.fury.io/js/fela-preset-dev.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-preset-dev.svg">

A Fela plugin preset for development.

> Do **not** use this preset in production!

#### Contains (exact order)
* [fela-plugin-logger](../fela-plugin-logger/)
* [fela-plugin-validator](../fela-plugin-validator/)


## Installation
```sh
yarn add fela-preset-dev
```
You may alternatively use `npm i --save fela-preset-dev`.


## Usage
Simply use the spread operator to add the preset.

```javascript
import { createRenderer } from 'fela'
import devPreset from 'fela-preset-dev'

const renderer = createRenderer({
  plugins: [
    // other plugins,
    ...devPreset
  ]
})
```

#### Configuration
Some plugins also accept some configuration options.
We can use the `createDevPreset` factory and pass the options using the plugin name as a key.

```javascript
import { createRenderer } from 'fela'
import { createDevPreset } from 'fela-preset-dev'

const renderer = createRenderer({
  plugins: [
    ...createDevPreset({
      'validator': [
        {
          logInvalid: true,
          deleteInvalid: true
        }
      ]
    })
  ]
})
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
