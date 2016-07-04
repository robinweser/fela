# Fela

**Fela** is a fast and modular library to handle styling in JavaScript.<br>
It is dynamic by design and renders your styles depending on your application state.

<img alt="TravisCI" src="https://travis-ci.org/rofrischmann/fela.svg?branch=master">
<a href="https://codeclimate.com/github/rofrischmann/fela/coverage"><img alt="Test Coverage" src="https://codeclimate.com/github/rofrischmann/fela/badges/coverage.svg"></a>
<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-~2.21kb-brightgreen.svg">
<a href="https://gitter.im/rofrischmann/fela"><img alt="Gitter" src="https://img.shields.io/gitter/room/rofrischmann/fela.svg"></a>

> [Try it on JSFiddle!](https://jsfiddle.net/mzrn1yvy/1/)

## Installation
```sh
npm i --save fela
```
Assuming you are using [npm](https://www.npmjs.com) as your package mananger you can `npm install` all packages. <br>
Otherwise we also provide [UMD](https://github.com/umdjs/umd) builds for each package within the `dist` folder. You can easily use them via [npmcdn](https://npmcdn.com/).
```HTML
<!-- Fela (Development): Unminified version including all warnings -->
<script src="https://npmcdn.com/fela@1.0.2/dist/fela.js"></script>
<!-- Fela (Production): Minified version -->
<script src="https://npmcdn.com/fela@1.0.2/dist/fela.min.js"></script>
```

## Example

```javascript
import { createRenderer, render } from 'fela'

// rules are just plain functions of props
// returning a valid object of style declarations
const rule = props => ({
  fontSize: props.fontSize + 'px',
  marginTop: props.margin ? '15px' : 0,
  color: 'red',
  lineHeight: 1.4,
  ':hover': {
    color: 'blue',
    fontSize: props.fontSize + 2 + 'px'
  },
  // nest media queries and pseudo classes
  // inside the style object
  '@media (min-height: 300px)': {
    backgroundColor: 'gray',
    ':hover': {
      color: 'black'
    }
  }
})

// Creates a new renderer to render styles
const renderer = createRenderer()

// Rendering the rule returns a className reference
// which can be attached to any element
const className = renderer.renderRule(rule, { fontSize: 12 }))

console.log(className) // => c0 c0-aw22w

// renders all styles into the DOM
render(renderer, mountNode)
```

## Documentation
+ [Introduction](http://fela.js.org/docs/Introduction.html)
* [Basics](http://fela.js.org/docs/Basics.html)
* [Advanced](http://fela.js.org/docs/Advanced.html)
* [Usage Guides](http://fela.js.org/docs/UsageGuides.html)
* [API Reference](http://fela.js.org/docs/API.html)
* [Troubleshooting](http://fela.js.org/docs/Troubleshooting.html)
* [FAQ](http://fela.js.org/docs/FAQ.html)
* [Feedback](http://fela.js.org/docs/Feedback.html)
* [Thanks](http://fela.js.org/docs/Thanks.html)

## Support
Join us on [Gitter](https://gitter.im/rofrischmann/fela). We highly appreciate any contribution.<br>
We also love to get feedback.


## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
