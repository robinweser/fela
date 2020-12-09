# fela-enforce-longhands

<img alt="npm version" src="https://badge.fury.io/js/fela-enforce-longhands.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-enforce-longhands.svg"> <a href="https://bundlephobia.com/result?p=fela-enforce-longhands@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela-enforce-longhands.svg"></a>

This enhancers implements are specific `propertyPriority` configuration that enforces longhand over shorthand properties. This enforces a certain order, but makes it deterministic which helps to prevent issues.

For example, `paddingLeft` will always overwrite the `padding-left` value from a `padding` property, no matter in which order they are rendered.

## How it works

It uses a clever CSS specificity trick where repeated selectors increase the specificity and thus a prioritized over others.

For example, if we render the following style:

```js
const style = {
  paddingLeft: 10,
  padding: 5,
}
```

the following CSS will be rendered respectively:

```css
.a.a {
  padding-left: 10px;
}

.b {
  padding: 5px;
}
```

> Check [Selectors Level 3](https://www.w3.org/TR/selectors-3/#specificity) for more information.

## Installation

```sh
yarn add fela-enforce-longhands
```

You may alternatively use `npm i --save fela-enforce-longhands`.

## Usage

```javascript
import { createRenderer } from 'fela'
import enforceLonghands from 'fela-enforce-longhands'

const renderer = createRenderer({
  enhancers: [enforceLonghands()],
})
```

## License

Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Commons License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](http://weser.io) and all the great contributors.
