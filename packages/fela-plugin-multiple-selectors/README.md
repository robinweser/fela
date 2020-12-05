# fela-plugin-multiple-selectors

<img alt="npm version" src="https://badge.fury.io/js/fela-plugin-multiple-selectors.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-multiple-selectors.svg"> <a href="https://bundlephobia.com/result?p=fela-plugin-multiple-selectors@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela-plugin-multiple-selectors.svg"></a>

Resolves comma-separated multiple selectors into single separate object properties.<br />
It also removes whitespace between selectors.

## Installation

```sh
yarn add fela-plugin-multiple-selectors
```

You may alternatively use `npm i --save fela-plugin-multiple-selectors`.

## Usage

Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import multipleSelectors from 'fela-plugin-multiple-selectors'

const renderer = createRenderer({
  plugins: [multipleSelectors()],
})
```

## Example

#### Input

```javascript
{
  color: 'blue',
  ':hover, :focus': {
    color: 'red'
  }
}
```

#### Output

```javascript
{
  color: 'blue',
  ':hover': {
    color: 'red'
  }
  ':focus': {
    color: 'red'
  }
}
```

## License

Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Commons License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](http://weser.io) and all the great contributors.
