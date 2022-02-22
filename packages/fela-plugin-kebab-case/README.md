# fela-plugin-kebab-case

<img alt="npm version" src="https://badge.fury.io/js/fela-plugin-kebab-case.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-kebab-case.svg"> <a href="https://bundlephobia.com/result?p=fela-plugin-kebab-case@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela-plugin-kebab-case.svg"></a>

> **Note**: We recommend writing your styles as camel-case properties in general. This conforms with the JavaScript APIs and is also more convenient to write.

Normalized all kebab-case properties into camel-case properties that Fela requires.

## Installation

```sh
yarn add fela-plugin-kebab-case
```

You may alternatively use `npm i --save fela-plugin-kebab-case`.

## Usage

Make sure to read the documentation on [how to use plugins](https://fela.js.org/docs/latest/advanced/plugins#using-plugins).

```javascript
import { createRenderer } from 'fela'
import kebabCase from 'fela-plugin-kebab-case'

const renderer = createRenderer({
  plugins: [kebabCase()],
})
```

## Example

#### Input

```javascript
{
  color: 'blue',
  'background-color': 'red'
}
```

#### Output

```javascript
{
  color: 'blue',
  backgroundColor: 'red'
}
```

## License

Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Commons License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](http://weser.io) and all the great contributors.
