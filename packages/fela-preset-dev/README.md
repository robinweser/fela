# fela-preset-dev

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

You can also pass options to the plugins:
```javascript
import { createRenderer } from 'fela'
import {createDevPreset} from 'fela-preset-dev'

const renderer = createRenderer({
  plugins: [
    ...createDevPreset({
      'fela-plugin-validator': [
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
