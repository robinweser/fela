# Reason Fela

<img alt="npm version" src="https://badge.fury.io/js/reason-fela.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/reason-fela.svg"> <a href="https://bundlephobia.com/result?p=reason-fela@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/reason-fela.svg"></a>

Official [Reason](http://reasonml.github.io) bindings for Fela and React Fela.<br />
It provides an [Css](https://github.com/astrada/bs-css-core) module which was forked from [bs-css](https://github.com/SentiaAnalytics/bs-css) for a more convenient style editing experience.

> **Note**: These bindings are still quite young and might change slightly. If you want to use older APIs such as `createComponent` or `connect`, we recommend using [bs-react-fela](https://github.com/astrada/bs-react-fela).

## Installation
```sh
yarn add reason-fela

# you'll also need at least fela and react-fela
yarn add fela react-fela
```
In your `bsconfig.json`, include `"reason-fela"` in the bs-dependencies.

## Usage
For more information and best practices on how to effectively use this package, please check out the main [Fela Documention - Usage with ReasonML](http://fela.js.org/docs/guides/UsageWithReasonML.html). Also make sure the check the [Usage with React](http://fela.js.org/docs/guides/UsageWithReact.html) documentation as it's based on those APIs.

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
