# fela-preset-web

<img alt="npm version" src="https://badge.fury.io/js/fela-preset-web.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-preset-web.svg"> <a href="https://bundlephobia.com/result?p=fela-preset-web@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela-preset-web.svg"></a>

A Fela plugin preset for web applications.<br>
It contains everything you need to start building cross-browser compatible apps.

#### Contains (exact order)
* [fela-plugin-extend](../fela-plugin-extend/)
* [fela-plugin-embedded](../fela-plugin-embedded/)
* [fela-plugin-prefixer](../fela-plugin-prefixer/)
* [fela-plugin-fallback-value](../fela-plugin-fallback-value/)
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

#### Configuration
Some plugins also accept some configuration options.
We can use the `createWebPreset` factory and pass the options using the plugin name as a key.

```javascript
import { createRenderer } from 'fela'
import { createWebPreset } from 'fela-preset-web'

const renderer = createRenderer({
  plugins: [
    ...createWebPreset({
      'unit': [
        'em',
        {
          margin: '%'
        }
      ]
    })
  ]
})
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Commons License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](http://weser.io) and all the great contributors.
