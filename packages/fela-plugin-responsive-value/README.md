# fela-plugin-responsive-value

<img alt="npm version" src="https://badge.fury.io/js/fela-plugin-responsive-value.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-responsive-value.svg"> <a href="https://bundlephobia.com/result?p=fela-plugin-responsive-value@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela-plugin-responsive-value.svg"></a>

This plugin adds support for responsive values as pioneered by [styled-system](https://styled-system.com) where one passes an array of values that later resolved to respective media queries.

> **Warning**: This package might clash with [fela-plugin-fallback-value](../fela-plugin-fallback-value/) and thus requires a list of whitelisted properties. We recommend using it **before** the fallback value.

## Installation
```sh
yarn add fela-plugin-responsive-value
```
You may alternatively use `npm i --save fela-plugin-responsive-value`.


## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import responsiveValue from 'fela-plugin-responsive-value'

const renderer = createRenderer({
  plugins: [ responsiveValue() ]
})
```

### Configuration
##### Parameters
| Parameter | Value | Default | Description |
| --- | --- | --- | --- |
| getMediaQueries | *(Function)* |  | Resolve the list of media queries used based on the values and props |
| properties | *(Object)* |  | A map of property-boolean pairs of which properties are resolved |

##### Example
```javascript
import { createRenderer } from 'fela'
import responsiveValue from 'fela-plugin-responsive-value'

// if we have 2 values, use default and large media query
// if we get 3, also use a tablet media query in between
const getMediaQueries = (values, props) => {
  if (values.length === 2) {
    return ["@media (min-width: 1024px)"]
  }

  return  ["@media (min-width: 800px)", "@media (min-width: 1024px)"]
}

const renderer = createRenderer({
  plugins: [ 
    responsiveValue(getMediaQueries, {
      padding: true,
      margin: true
    })
  ]
})
```

## Example
Using the above example code:

#### Input
```javascript
{
  margin: [0, 10]
  padding: [5, 10, 15]
}
```
#### Output
```javascript
{
  margin: 0,
  padding: 5,
  "@media (min-width: 800px)": {
    padding: 10
  },
  "@media (min-width: 1024px)": {
    margin: 10,
    padding: 15
  }
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Commons License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](http://weser.io) and all the great contributors.
