<h1 align="center">Fela</h1>
<p align="center">
Dynamic Styling in JavaScript.
<br>
<img alt="TravisCI" src="https://travis-ci.org/rofrischmann/fela.svg?branch=develop">
<a href="https://codeclimate.com/github/rofrischmann/fela/coverage"><img alt="Test Coverage" src="https://codeclimate.com/github/rofrischmann/fela/badges/coverage.svg"></a>
<img alt="npm version" src="https://badge.fury.io/js/fela.svg">
<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-~1.86kb-brightgreen.svg">
</p>
<br>
**Fela** is an universal, modular, performant and *(only ~1.86kb)* low-level API to handle Styling in JavaScript. It adds dynamic behavior to extend and modify styles over time. It is considered a low-level API, but serves well in production as a stand-alone solution as well.

The API is strictly designed alongside numerous [design principles](docs/Principles.md)
While it is build with CSS and web technology in mind, it is not bound to the DOM nor CSS explicitly but build upon basic and abstract Components that can even be used with libraries like React Native.<br>

# API documentation

* [Selector](docs/Selector.md)
  * [.render([props, plugins])](docs/Selector.md#renderprops-plugins)
* [DOMRenderer](docs/DOMRenderer.md)
  * [.render(node, selector [, props, plugins])](docs/DOMRenderer.md#rendernode-selector-props-plugins)
  * [.clear(node)](docs/DOMRenderer.md#clearnode)
* [enhanceWithPlugins](docs/enhanceWithPlugins.md)


# License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de).
