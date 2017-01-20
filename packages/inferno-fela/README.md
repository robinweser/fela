# Inferno Fela

Official [Inferno](https://github.com/trueadm/inferno) bindings for Fela.

<img alt="TravisCI" src="https://travis-ci.org/rofrischmann/inferno-fela.svg?branch=master">
<a href="https://codeclimate.com/github/rofrischmann/inferno-fela/coverage"><img alt="Test Coverage" src="https://codeclimate.com/github/rofrischmann/inferno-fela/badges/coverage.svg"></a>
<img alt="npm downloads" src="https://img.shields.io/npm/dm/inferno-fela.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-1.16kb-brightgreen.svg">


This package only includes Inferno bindings for [Fela](http://github.com/rofrischmann/fela). <br>
It assumes you already know about Fela and how to use it.

> [Learn about Fela!](http://github.com/rofrischmann/fela)


## Installation
```sh
npm i --save inferno-fela
```

Assuming you are using [npm](https://www.npmjs.com) as your package mananger you can basically just `npm install` all packages. <br>
Otherwise we also provide [UMD](https://github.com/umdjs/umd) builds for each package within the `dist` folder. You can easily use them via [unpkg](https://unpkg.com/).
> **Caution**: You need to include both Inferno and Fela on your own as well.

```HTML
<!-- Development build (with warnings)  -->
<script src="https://unpkg.com/inferno-fela@1.0.0/dist/inferno-fela.js"></script>
<!-- Production build (minified)  -->
<script src="https://unpkg.com/inferno-fela@1.0.0/dist/inferno-fela.min.js"></script>
```

## API
This package does not ship separate API documentation as it implements the exact same API as the [react-fela](https://github.com/rofrischmann/react-fela) bindings. Check those out instead.

## Usage
For more information and best practices on how to effectively use this package, please check out the main [Fela Documention - Usage with Inferno](http://fela.js.org/docs/guides/UsageWithInferno.html). There you will also find some usage examples. This package only contains the pure API reference documentation.

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de).
