# fela-plugin-named-keys

> **Note**: This plugin was named `fela-plugin-named-media-query` before. It was renamed to semantically also match `@supports` rules.

<img alt="npm version" src="https://badge.fury.io/js/fela-plugin-named-keys.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-named-keys.svg"> <a href="https://bundlephobia.com/result?p=fela-plugin-named-keys@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela-plugin-named-keys.svg"></a>

This plugin is basically a convenient plugin for more readable code and better maintenance.<br>
It allows to define custom key names that are later replaced for valid keys.

## Installation
```sh
yarn add fela-plugin-named-keys
```
You may alternatively use `npm i --save fela-plugin-named-keys`.


## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import namedKeys from 'fela-plugin-named-keys'

const renderer = createRenderer({
  plugins: [ namedKeys() ]
})
```

### Configuration
##### Parameters
| Parameter | Value | Default | Description |
| --- | --- | --- | --- |
| keyMap | *(Object)* | `{}` | An object with key-replacement pairs |

##### Example
```javascript
import { createRenderer } from 'fela'
import namedKeys from 'fela-plugin-named-keys'

const namedKeysPlugin = namedKeys({
  desktop: '@media (min-width: 1024px)',
  tablet: '@media (min-width: 768px)',
  supportsFlex: '@supports (display: flex)',
  supportsGrid: '@supports (display: grid)'
})

const renderer = createRenderer({
  plugins: [ namedKeysPlugin ]
})
```

## Example
Using the above example code:

#### Input
```javascript
{
  color: 'red',
  supportsGrid: {
    color: 'green'
  },
  desktop: {
    color: 'blue',
    supportsGrid: {
      color: 'yellow'
    }
  }
}
```
#### Output
```javascript
{
  color: 'red',
  '@supports (display: grid)' : {
    color: 'green'
  },
  '@media (min-width: 1024px)': {
    color: 'blue',
    '@supports (display: grid)' : {
      color: 'yellow'
    },
  }
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Commons License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](http://weser.io) and all the great contributors.
