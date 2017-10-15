# React Fela

<img alt="npm version" src="https://badge.fury.io/js/react-fela.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/react-fela.svg">

Official [React](https://github.com/facebook/react) bindings for Fela.

This package only includes React bindings for [Fela](http://github.com/rofrischmann/fela).<br>
It assumes you already know about Fela and how to use it.

## Installation
```sh
yarn add react-fela
```
You may alternatively use `npm i --save react-fela`.

## API Reference
* [`<Provider renderer>`](docs/Provider.md)
* [`connect(rules)`](docs/connect.md)
* [`createComponent(rule, [type], [passThroughProps])`](docs/createComponent.md)
* [`createComponentWithProxy(rule, [type], [passThroughProps])`](docs/createComponentWithProxy.md)
* [`<ThemeProvider theme [overwrite]>`](docs/ThemeProvider.md)
* [`withTheme(component)`](docs/withTheme.md)

## Usage
For more information and best practices on how to effectively use this package, please check out the main [Fela Documention - Usage with React](http://fela.js.org/docs/guides/UsageWithReact.html). There you will also find some usage examples. This package only contains the pure API reference documentation.


## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
