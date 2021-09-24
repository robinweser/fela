# fela-plugin-hover-media

<img alt="npm version" src="https://badge.fury.io/js/fela-plugin-hover-media.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-hover-media.svg"> <a href="https://bundlephobia.com/result?p=fela-plugin-hover-media@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela-plugin-hover-media.svg"></a>

Extracts all `:hover` styles and wrap them in a `@media (hover: hover)` media query.<br />

It is inspired by [postcss-hover-media-feature](https://github.com/saulhardman/postcss-hover-media-feature).

## Why

> This paragraph was copied from [postcss-hover-media-feature](https://github.com/saulhardman/postcss-hover-media-feature) and it perfectly answers the question.

Certain mobile browsers apply `:hover` styles on 'tap', which (in most cases) isn't desirable. By wrapping `:hover` styles with a [Hover Media Feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover) media query these styles will only be applied on devices that support them.

## Installation

```sh
yarn add fela-plugin-hover-media
```

You may alternatively use `npm i --save fela-plugin-hover-media`.

## Usage

Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import hoverMedia from 'fela-plugin-hover-media'

const renderer = createRenderer({
  plugins: [hoverMedia()],
})
```

## Example

#### Input

```javascript
{
  color: "red",
  ':hover': {
    color: "blue"
  }
}
```

#### Output

```javascript
{
  color: "red",
  '@media (hover: hover)': {
    ':hover': {
      color: "blue"
    }
  }
}
```

## License

Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](http://weser.io) and all the great contributors.
