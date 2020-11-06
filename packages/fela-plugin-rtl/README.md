# fela-plugin-rtl

<img alt="npm version" src="https://badge.fury.io/js/fela-plugin-rtl.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-rtl.svg"> <a href="https://bundlephobia.com/result?p=fela-plugin-ftl@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela-plugin-rtl.svg"></a>

Uses [rtl-css-js](https://github.com/kentcdodds/rtl-css-js) to convert a style object to its right-to-left counterpart.

## Installation
```sh
yarn add fela-plugin-rtl
```
You may alternatively use `npm i --save fela-plugin-rtl`.


## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import rtl from 'fela-plugin-rtl'

const renderer = createRenderer({
  plugins: [ rtl() ]
})
```


### Configuration
##### Parameters
| Parameter | Value | Default | Description |
| --- | --- | --- | --- |
| defaultDirection | *("rtl" \| "ltr")* | `rtl` | The default direction which can be useful if one is using the `theme.direction` option to dynamically toggle rtl transformation |


## Example

#### Input
```javascript
{
  paddingLeft: 20,
  marginRight: '25px',
  cursor: 'w-resize',
  textShadow: 'red 2px 0'
}
```
#### Output
```javascript
{
  paddingRight: 20,
  marginleft: '25px',
  cursor: 'e-resize',
  textShadow: 'red -2px 0'
}
```

## Theme-Based Mode
Apart from enforcing rtl all the time, one can also leverage a special `props.theme.direction` property to enable/disable rtl transformation. This is especially useful together with React to disable transformation for subtrees.

```javascript
const rule = () => ({
  paddingLeft: 20,
  marginRight: '25px',
  cursor: 'w-resize',
  textShadow: 'red 2px 0'
})

// will be transformed
renderer.renderRule(rule)

// wont be transformed
renderer.renderRule(rule, { theme: { direction: 'ltr' }})
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Commons License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](http://weser.io) and all the great contributors.
