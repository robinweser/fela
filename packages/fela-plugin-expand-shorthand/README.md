# fela-plugin-expand-shorthand

<img alt="npm version" src="https://badge.fury.io/js/fela-plugin-expand-shorthand.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-expand-shorthand.svg"> <a href="https://bundlephobia.com/result?p=fela-plugin-expand-shorthand@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela-plugin-expand-shorthand.svg"></a>

Expands shorthand properties in style objects so that only longhand properties are used.

It uses [inline-style-expand-shorthand](https://github.com/robinweser/inline-style-expand-shorthand) under the hood. Check the repo if you're interested in which properties are supported.

It comes in two different modes: One that simply expands the shorthands and one that merges the resulting longhands with existing longhands in the style object depending on the specificity of that property.

## Installation
```sh
yarn add fela-plugin-expand-shorthand
```
You may alternatively use `npm i --save fela-plugin-expand-shorthand`.

## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import expandShorthand from 'fela-plugin-expand-shorthand'

const renderer = createRenderer({
  plugins: [ expandShorthand() ]
})
```

### Configuration
In order to get enable auto-merging of longhands, one needs to pass a configuration flag.

```javascript
import { createRenderer } from 'fela'
import expandShorthand from 'fela-plugin-expand-shorthand'

const renderer = createRenderer({
  plugins: [ expandShorthand(true) ]
})
```

## Example

#### Input
```javascript
{
  padding: '15px 20px 5px'
}
```
#### Output
```javascript
{
  paddingTop: '15px',
  paddingRight: '20px',
  paddingBottom: '15px',
  paddingLeft: '5px'
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](http://weser.io) and all the great contributors.
