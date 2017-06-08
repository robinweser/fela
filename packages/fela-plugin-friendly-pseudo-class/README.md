# fela-plugin-friendly-pseudo-class


<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-friendly-pseudo-class.svg"> <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.54kb-brightgreen.svg">

Writing CSS pseudo classes within a plain JavaScript object sadly is sometimes painful as the default syntax is not really JavaScript-friendly.<br>

This plugins provides support for JavaScript-friendly pseudo class syntax with an `on`-prefix. e.g.

## Installation
```sh
yarn add fela-plugin-friendly-pseudo-class
```
You may alternatively use `npm i --save fela-plugin-friendly-pseudo-class`.


## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import friendlyPseudoClass from 'fela-plugin-friendly-pseudo-class'

const renderer = createRenderer({
  plugins: [ friendlyPseudoClass() ]
})
```


## Example

#### Input
```javascript
{
  onHover: {
    color: 'red'
  }
}
```
#### Output
```javascript
{
  ':hover': {
    color: 'red'
  }
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
