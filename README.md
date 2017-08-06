# Fela

Fela is a fast and modular library to handle styling in JavaScript.<br>
It is dynamic by design and renders your styles depending on your application state.

It generates CSS and therefore supports all common CSS features such as media queries, pseudo classes, keyframes and font-faces. It also renders on server-side with ease and ships with a powerful plugin API adding e.g. [automatic vendor prefixing](packages/fela-plugin-prefixer) or [fallback value](packages/fela-plugin-fallback-value) support.

Fela can be used with [React](https://github.com/rofrischmann/fela/tree/master/packages/react-fela) or with any other view library. It even supports [React Native](http://fela.js.org/docs/guides/UsageWithReactNative.html).

<img alt="TravisCI" src="https://travis-ci.org/rofrischmann/fela.svg?branch=master"> <a href="https://codeclimate.com/github/rofrischmann/fela/coverage"><img alt="Test Coverage" src="https://codeclimate.com/github/rofrischmann/fela/badges/coverage.svg"></a> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela.svg"> <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-3.16kb-brightgreen.svg"> <img alt="npm version" src="https://badge.fury.io/js/fela.svg"> <a href="https://gitter.im/rofrischmann/fela"><img alt="Gitter" src="https://img.shields.io/gitter/room/rofrischmann/fela.svg"></a>

## Installation
```sh
yarn add fela
```
You may alternatively use `npm i --save fela`.

## Features
* Dynamic styling
* Universal rendering
* Dead code elimination
* High performance
* Minimal CSS output
* Framework-agnostic
* Pseudo classes & Media queries
* Child & Attribute selectors
* Vendor prefixing
* Component theming
* Many useful plugins
* Local namespace

## The Gist
Fela is all about rendering styles, especially so called rules. A universal renderer will help us to render styles of all kind. Once rendered into a DOM node, a change listener will subscribe to changes and automatically add new rules.<br>
The following example illustrates the key parts of Fela though it only shows the very basics.

```javascript
import { createRenderer } from 'fela'
import { render } from 'fela-dom'

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

// creates a new renderer to render styles
const renderer = createRenderer()

// rendering the rule returns a className reference
// which can be attached to any element
const className = renderer.renderRule(rule, { fontSize: 12 })

// it uses atomic css design to reuse styles
// on declaration base and to keep the markup minimal
console.log(className) // => a b c d e f h

// renders all styles into the DOM
render(renderer)
```

## Documentation
* [Introduction](http://fela.js.org/docs/Introduction.html)
* [Basics](http://fela.js.org/docs/Basics.html)
* [Advanced](http://fela.js.org/docs/Advanced.html)
* [Usage Guides](http://fela.js.org/docs/UsageGuides.html)
* [Recipes](http://fela.js.org/docs/Recipes.html)
* [API Reference](http://fela.js.org/docs/API.html)
* [Troubleshooting](http://fela.js.org/docs/Troubleshooting.html)
* [FAQ](http://fela.js.org/docs/FAQ.html)
* [Feedback](http://fela.js.org/docs/Feedback.html)
* [Thanks](http://fela.js.org/docs/Thanks.html)

## Posts
* [**Style as a Function of State**](https://medium.com/@rofrischmann/styles-as-functions-of-state-1885627a63f7#.6k6i4kdch)<br> - *by [@rofrischmann](https://twitter.com/rofrischmann)*
* [**CSS in JS: The Argument Refined**](https://medium.com/@steida/css-in-js-the-argument-refined-471c7eb83955#.3otvkubq4)<br> - *by [@steida](https://twitter.com/steida)*

## Examples
* [Fela + React](http://fela.js.org/docs/introduction/Examples.html#react) ([source](packages/example-react))
* [Fela + React Native](http://fela.js.org/docs/introduction/Examples.html#react-native) ([source](packages/example-react-native))
* [Fela + Preact](http://fela.js.org/docs/introduction/Examples.html#preact) ([source](packages/example-preact))
* [Fela + Inferno](http://fela.js.org/docs/introduction/Examples.html#inferno) ([source](packages/example-inferno))
* [Fela + Angular 2](http://fela.js.org/docs/introduction/Examples.html#angular-2) ([source](packages/example-angular2))
* [Fela + Next](https://github.com/zeit/next.js/tree/master/examples/with-fela)
* [Fela + HyperScript](https://github.com/ahdinosaur/hyper-fela#example)
* [Fela + Cycle](https://github.com/wcastand/cycle-fela-example)

## Workshop
* [fela-workshop](https://github.com/tajo/fela-workshop) - demonstrates typical Fela usage, side by side examples of CSS and Fela, a playground project

## Community
* [Aesthetic](https://github.com/milesj/aesthetic) - React style and theme layer with Fela support
* [cf-ui](https://github.com/cloudflare/cf-ui) - Cloudflare UI Framework
* [Este](https://github.com/este/este) - Starter kit for universal full–fledged React apps build with Fela
* [Kilvin](https://github.com/rofrischmann/kilvin) - Primitive React Layout Components with Fela
* [Tel Aviv](https://github.com/dustin-H/telaviv) - React Universal Rendering

## Contributing

We highly appreciate any contribution. For more information follow the document [Contributing](.github/CONTRIBUTING.md).<br> Also, please read our [code of conduct](CODE_OF_CONDUCT.md).


## Support
Join us on [Gitter](https://gitter.im/rofrischmann/fela). <br>
We love to get feedback.

## Who's using Fela?

> Your company is using Fela, but is not listed yet? [Add your company / organisation](https://github.com/rofrischmann/fela/edit/master/README.md#L121)

- [abilis](https://www.abilis.de)
- [BdP LV RPS](http://www.bdp-rps.de)
- [Cloudflare](https://www.cloudflare.com)
- [HelloFresh](https://www.hellofresh.de)
- [Kilix](http://kilix.fr)
- [MediaFire](https://m.mediafire.com)
- [N26](https://n26.com)
- [NinjaConcept](https://www.ninjaconcept.com)
- [Optisure](https://www.optisure.de)
- [V2](https://www.v2.com)


## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
