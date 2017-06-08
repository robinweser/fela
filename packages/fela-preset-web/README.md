# fela-preset-web

A Fela plugin preset for web applications.<br>
It contains everything you need to start building cross-browser compatible apps.

#### Contains (exact order)
* [fela-plugin-extend](../fela-plugin-extend/)
* [fela-plugin-prefixer](../fela-plugin-prefixer/)
* [fela-plugin-fallback-value](../fela-plugin-fallback-value/)
* [fela-plugin-lvha](../fela-plugin-lvha/)
* [fela-plugin-unit](../fela-plugin-unit/)


## Installation
```sh
yarn add fela-preset-web
```
You may alternatively use `npm i --save fela-preset-web`.


## Usage
Simply use the spread operator to add the preset.

```javascript
import { createRenderer } from 'fela'
import webPreset from 'fela-preset-web'

const renderer = createRenderer({
  plugins: [
    ...webPreset,
    // other plugins
  ]
})
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
