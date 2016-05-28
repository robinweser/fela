<h1 align="center">Fela</h1>
<p align="center">
Dynamic Styling in JavaScript.
<br>
<img alt="TravisCI" src="https://travis-ci.org/rofrischmann/fela.svg?branch=master">
<a href="https://codeclimate.com/github/rofrischmann/fela/coverage"><img alt="Test Coverage" src="https://codeclimate.com/github/rofrischmann/fela/badges/coverage.svg"></a>
<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-~2.9kb-brightgreen.svg">
</p>
<br>
**Fela** is a fast, modular, dynamic and tiny *(2.9kb gzipped)* low-level API to handle Styling in JavaScript. It adds dynamic behavior to extend and modify styles over time. It is considered a low-level API, but serves well in production as a stand-alone solution as well.

## Benefits
* Universal rendering
* Locally scoped styles
* Style isolation
* No specificity conflicts
* Works with any framework
* Dead code elimination
* Optimized rendering
* Extendable with plugins
* No build step


## Example
```javascript
import { Selector, Renderer } from 'fela'

// Selectors use simple functions of props
// returning a valid object of style declarations
const selector = new Selector(props => {
  fontSize: props.fontSize + 'px',
  marginTop: props.margin ? '15px' : 0,
  color: 'red',
  lineHeight: 1.4,
  ':hover': {
    color: 'blue',
    fontSize: props.fontSize + 2 + 'px'
  }
}))

// Binding a new Renderer to a DOM node which
// automatically updates its CSS content on render
const renderer = new Renderer(mountNode)

// Rendering returns a className reference which
// can be attached to any element
const className = renderer.render(selector, { fontSize: 12 }))

console.log(className) // => c0-aw22w
```
Generated CSS markup will look like this:
```CSS
.c0-aw22w {
  font-size: 12px;
  margin-top: 0;
  color: red;
  line-height: 1.4
}

.c0-aw22w:hover {
  color: blue;
  font-size: 14px;
}
```

## Installation
```sh
npm i --save fela
```
All packages including all plugins are also available via [npmcdn](https://npmcdn.com/).
```HTML
<!-- Fela: core library  -->
<script src="https://npmcdn.com/fela@1.0.0-alpha.3/dist/fela.min.js"></script>

<!-- FelaPluginFallbackValue: plugins always use camel cased globals -->
<script src="https://npmcdn.com/fela-plugin-fallback-value@1.0.0-alpha.3/dist/fela-plugin-fallback-value.min.js"></script>
```

## Documentation
+ [Getting Started](/docs/GettingStarted.md)
* [Design Principles](docs/Principles.md)
* [Rendering Mechanism](docs/RenderingMechanism.md)
* [API Reference](docs/api/)
* [Plugins](docs/plugins/)
* [FAQ](FAQ)

### Plugins
| name | configurable | size *(gzipped)* | description |
| --- | --- | --- | ------ |
|[prefixer](docs/plugins/Prefixer.md) |no | 3.04kb |Adds vendor prefixes to the styles |
|[fallbackValue](docs/plugins/fallbackValue.md) |no | 0.64kb | Resolves arrays of fallback values |
|[friendlyPseudoClass](docs/plugins/FriendlyPseudoClass.md) |no |0.48kb |Transforms javascript-friendly pseudo class into valid syntax  |
|[customProperty](docs/plugins/CustomProperty.md) |[yes](docs/plugins/CustomProperty.md#configuration) | 0.42kb | Resolves custom properties |
|[unit](docs/plugins/Unit.md) |[yes](docs/plugins/Unit.md#configuration) |1.08kb | Automatically adds units to values if needed  |
|[LVHA](docs/plugins/LVHA.md) |no |0.47kb | Sorts pseudo classes according to [LVH(F)A](https://css-tricks.com/remember-selectors-with-love-and-hate/)  |


# License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de).
