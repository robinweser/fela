# fela-plugin-bidi

<img alt="npm version" src="https://badge.fury.io/js/fela-plugin-bidi.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-bidi.svg"> <a href="https://bundlephobia.com/result?p=fela-plugin-bidi@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela-plugin-bidi.svg"></a>

Uses [bidi-css-js](https://github.com/TxHawks/bidi-css-js) to enable direction-independent style authoring based on the CSSWG's [CSS Logical Properties and Values](https://www.w3.org/TR/css-logical-1/) proposal.

It is important to note that, when used as a Fela renderer plugin, this package is not a true polyfill for the proposal, as all `start` and `end` properties (and so on) are converted to `left` or `right` values (etc.), and will not automatically flip when the writing direction (`dir`) changes in the document.

When used in conjunction with [fela-plugin-fallback-value](https://github.com/rofrischmann/fela/blob/master/packages/fela-plugin-fallback-value), `fela-plugin-bidi` must be passed to the `plugins` array _**after**_ `fela-plugin-fallback-value`, as it cannot handle the array used to pass fallbacks on its own.

## Installation
```sh
yarn add fela-plugin-bidi
```
You may alternatively use `npm i --save fela-plugin-bidi`.


## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

For details on what the plugin can and cannot do, please see the documentation in the [underlying library](https://github.com/TxHawks/bidi-css-js/blob/master/README.md). Please make sure to look at the
note about four-directional shorthand properties, as there was a breaking change in version `2.0.0`.

```javascript
import { createRenderer } from 'fela'
import bidi from 'fela-plugin-bidi'

const renderer = createRenderer({
  plugins: [ bidi('rtl') ]
})
```

With `fela-plugin-fallback-value`:
```js
import { createRenderer } from 'fela'
import fallbackValue from 'fela-plugin-fallback-value'
import bidi from 'fela-plugin-bidi'

const renderer = createRenderer({
  plugins:[fallbackValue(), bidi('rtl')] // Order matters.
})
```

## Example

#### Input
```javascript
{
  // BackgroundImage also supports transforming linear-gradient
  backgroundImage: 'logical url(/foo/bar/ste.png)',
  cursor: 'start-resize',
  float: 'end',
  margin: 'logical 1px 2px 3px 4px',
  paddingStart: 20,
}
```
#### Output
```javascript
// When `flowDirection` is set to `rtl`
{
  backgroundImage: 'url(/foo/bar/rtl.png)',
  cursor: 'e-resize',
  float: 'left',
  margin: '1px 4px 3px 2px',
  paddingRight: 20,
}

// When `flowDirection` is set to `ltr`
{
  backgroundImage: 'url(/foo/bar/ltr.png)',
  cursor: 'w-resize',
  float: 'right',
  margin: '1px 2px 3px 4px',
  paddingLeft: 20,
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
