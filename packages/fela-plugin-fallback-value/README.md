# fela-plugin-fallback-value

<img alt="npm version" src="https://badge.fury.io/js/fela-plugin-fallback-value.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-fallback-value.svg"> <a href="https://bundlephobia.com/result?p=fela-plugin-fallback-value@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela-plugin-fallback-value.svg"></a>

Sometimes you want to provide alternative values also know as *fallback values*. <br>
For example in Internet Explorer 8 there is no `rgba` compatibility for colors which means just passing *e.g. `color: rgba(0, 0, 0, 0.5)`* would not be applied correctly.
By passing an array of values you can provide fallback values.

## Installation
```sh
yarn add fela-plugin-fallback-value
```
You may alternatively use `npm i --save fela-plugin-fallback-value`.


## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import fallbackValue from 'fela-plugin-fallback-value'

const renderer = createRenderer({
  plugins: [ fallbackValue() ]
})
```

## Example

#### Input
```javascript
{
  color: [ '#ccc', 'rgba(0, 0, 0, 0.5)' ]
}
```
#### Output
```javascript
{
  color: '#ccc;rgba(0, 0, 0, 0.5);'
}
```
which is similar to the following CSS code:
```CSS
{
	color: #ccc;
	color: rgba(0, 0, 0, 0.5);
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Commons License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](http://weser.io) and all the great contributors.
