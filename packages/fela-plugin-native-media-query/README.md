# fela-plugin-native-media-query

<img alt="npm version" src="https://badge.fury.io/js/fela-plugin-native-media-query.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-native-media-query.svg"> <a href="https://bundlephobia.com/result?p=fela-plugin-native-media-query@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela-plugin-native-media-query.svg"></a>

This plugin is basically a convenient plugin for more readable code and better maintenance.<br>
It enables the use of named media query keys.

## Installation
```sh
yarn add fela-plugin-native-media-query
```
You may alternatively use `npm i --save fela-plugin-native-media-query`.


## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import namedMediaQuery from 'fela-plugin-native-media-query'

const renderer = createRenderer({
  plugins: [ namedMediaQuery() ]
})
```

### Configuration
##### Parameters
| Parameter | Value | Default | Description |
| --- | --- | --- | --- |
| mediaQueryMap | *(Object)* | `{}` | An object with shorthand-mediaQuery pairs |

##### Example
```javascript
import { createRenderer } from 'fela'
import namedMediaQuery from 'fela-plugin-native-media-query'

const namedMediaQueryPlugin = namedMediaQuery({
  desktop: '@media (min-width: 1024px)',
  tablet: '@media (min-width: 768px)'
})

const renderer = createRenderer({
  plugins: [ namedMediaQueryPlugin ]
})
```

## Example
Using the above example code:

#### Input
```javascript
{
  color: 'red',
  desktop: {
    color: 'blue'
  }
}
```
#### Output
```javascript
{
  color: 'red',
  '@media (min-width: 1024px)': {
    color: 'blue'
  }
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
