# fela-plugin-prefixer

<img alt="npm version" src="https://badge.fury.io/js/fela-plugin-prefixer.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-prefixer.svg"> <a href="https://bundlephobia.com/result?p=fela-plugin-prefixer@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela-plugin-prefixer.svg"></a>

Uses [stylis](https://github.com/thysultan/stylis) to add vendor prefixes to both property and value.

## Installation

```sh
yarn add fela-plugin-prefixer
```

You may alternatively use `npm i --save fela-plugin-prefixer`.

## Usage

Make sure to read the documentation on [how to use plugins](https://fela.js.org/docs/latest/advanced/plugins#using-plugins).

```javascript
import { createRenderer } from 'fela'
import prefixer from 'fela-plugin-prefixer'

const renderer = createRenderer({
  plugins: [prefixer()],
})
```

## Example

#### Input

```javascript
{
  display: 'flex',
  appearance: 'none'
}
```

#### Output

```javascript
{
  display: 'webkit-box;display:-webkit-flex;display:flex',
  WebkitAppearance: 'none;-moz-appearance:none;appearance:none'
}
```

## License

Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Commons License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](http://weser.io) and all the great contributors.
