<h1><img alt="Fela" src="docs/res/logo.png" width="203"/></h1>

Fela is a small, performant and framework-agnostic toolbelt to handle styling in JavaScript.<br>
It is dynamic by design and renders your styles depending on your application state.

It generates minimal, optimized CSS and therefore supports all common CSS features such as media queries, pseudo classes, keyframes and font-faces. It supports universal rendering and ships with a powerful plugin API adding e.g. [vendor prefixing](packages/fela-plugin-prefixer) or [fallback value](packages/fela-plugin-fallback-value) support.

Fela can be used with [React](https://github.com/rofrischmann/fela/tree/master/packages/react-fela) or with any other view library. It even supports [React Native](http://fela.js.org/docs/guides/UsageWithReactNative.html).

<img alt="TravisCI" src="https://travis-ci.org/rofrischmann/fela.svg?branch=master"> <a href="https://codeclimate.com/github/rofrischmann/fela/coverage"><img alt="Test Coverage" src="https://codeclimate.com/github/rofrischmann/fela/badges/coverage.svg"></a> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela.svg"> <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-~3kb-brightgreen.svg"> <img alt="npm version" src="https://badge.fury.io/js/fela.svg"> <a href="https://gitter.im/rofrischmann/fela"><img alt="Gitter" src="https://img.shields.io/gitter/room/rofrischmann/fela.svg"></a> <a href="#backers"><img alt="Backers on Open Collective" src="https://opencollective.com/fela/backers/badge.svg"></a> <a href="#sponsors"><img alt="Sponsors on Open Collective" src="https://opencollective.com/fela/sponsors/badge.svg"></a>

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

## Examples
* [Fela + React](http://fela.js.org/docs/introduction/Examples.html#react) ([source](packages/example-react))
    * [React Styleguidist](http://fela.js.org/docs/introduction/Examples.html#styleguidist) ([source](packages/example-with-styleguidist))
* [Fela + React Native](http://fela.js.org/docs/introduction/Examples.html#react-native) ([source](packages/example-react-native))
* [Fela + Preact](http://fela.js.org/docs/introduction/Examples.html#preact) ([source](packages/example-preact))
* [Fela + Inferno](http://fela.js.org/docs/introduction/Examples.html#inferno) ([source](packages/example-inferno))
* [Fela + Angular 2](http://fela.js.org/docs/introduction/Examples.html#angular-2) ([source](packages/example-angular2))
    * [TypeScript](http://fela.js.org/docs/introduction/Examples.html#typescript) ([source](packages/example-angular2-typescript))
* [Fela + Next](https://github.com/zeit/next.js/tree/master/examples/with-fela)
* [Fela + HyperScript](https://github.com/ahdinosaur/hyper-fela#example)
* [Fela + Cycle](https://github.com/wcastand/cycle-fela-example)

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

## Workshop
If you are coming from CSS and want to learn JavaScript Styling with Fela, there is a full-feature [fela-workshop](https://github.com/tajo/fela-workshop) which demonstrates typical Fela use cases. It teaches all important parts, step by step with simple examples. If you already know other CSS in JS solutions and are just switching to Fela, you might not need to do the whole workshop, but it still provides useful information to get started quickly.

## Posts & Talks
* [**Style as a Function of State**](https://medium.com/@rofrischmann/styles-as-functions-of-state-1885627a63f7#.6k6i4kdch)<br> - *by [Robin Frischmann](https://twitter.com/rofrischmann)*
* [**CSS in JS: The Argument Refined**](https://medium.com/@steida/css-in-js-the-argument-refined-471c7eb83955#.3otvkubq4)<br> - *by [Daniel Steigerwald](https://twitter.com/steida)*
* [**What is Fela?**](https://davidsinclair.io/thoughts/what-is-fela)<br> - *by [David Sinclair](https://davidsinclair.io)*
* [**Choosing a CSS in JS library**](https://gist.github.com/troch/c27c6a8cc47b76755d848c6d1204fdaf#file-choosing-a-css-in-js-library-md)<br> - *by [Thomas Roch](https://twitter.com/tcroch)*
* [**Introducing Fela 6.0**](https://medium.com/@rofrischmann/introducing-fela-6-0-289c84b52dd5)<br> - *by [Robin Frischmann](https://twitter.com/rofrischmann)*

## Ecosystem
There are tons of useful packages maintained within this repository including plugins, enhancers, bindings and tools that can be used together with Fela. Check the [Ecosystem](http://fela.js.org/docs/introduction/Ecosystem.html) documentation for a quick overview.


## Community
Apart from all the packages managed within this repository, there are many community third-party projects that are worth mentioning:

* [aesthetic](https://github.com/milesj/aesthetic) - React style and theme layer with Fela support
* [base-styling-components](https://github.com/pitr12/base-styling-components) - Abstract Box and Text Components
* [catstack](https://github.com/root-systems/catstack) - A modular mad science framework for teams working on production web apps
* [cf-ui](https://github.com/cloudflare/cf-ui) - Cloudflare UI Framework
* [cycle-fela](https://github.com/wcastand/cycle-fela) - Cycle bindings for Fela
* [dogstack](https://github.com/root-systems/dogstack) - A popular-choice grab-bag framework for teams working on production web apps
* [este](https://github.com/este/este) - Starter kit for universal full–fledged React apps build with Fela
* [fela-components](https://github.com/arturmuller/fela-components) - Styling library for React and Fela
* [fela-react-prop](https://github.com/codepunkt/fela-react-prop) - Generate class names for fela style rule and apply them as property on a wrapped component
* [fela-styles-connector](https://github.com/dustin-H/fela-styles-connector) - Simplified react-fela `connect` with auto-bound styles
* [frejya](https://github.com/benoneal/freyja): Pass styles as props to components
* [hyper-fela](https://github.com/ahdinosaur/hyper-fela) - HyperScript bindings for Fela
* [kilvin](https://github.com/rofrischmann/kilvin) - Primitive React Layout Components with Fela
* [storybook-addon-props-fela](https://github.com/Kilix/storybook-addon-props-fela): Document the props of your Fela components in storybook.
* [telaviv](https://github.com/dustin-H/telaviv) - React Universal Rendering
* [vashet](https://github.com/derHowie/vashet) - ClojureScript wrapper for Fela
* [veel](https://github.com/queckezz/veel) - Base react styling components using fela with a design system
* [vue-fela](https://github.com/dustin-H/vue-fela) - Vue bindings for Fela


## Support
Got a question? Come and join us on [Gitter](https://gitter.im/rofrischmann/fela)! <br>
We'd love to help out. We also highly appreciate any feedback.

## Who's using Fela?

> Your company is using Fela, but is not listed yet? [Add your company / organisation](https://github.com/rofrischmann/fela/edit/master/README.md#L121)

- [abilis](https://www.abilis.de)
- [BdP LV RPS](http://www.bdp-rps.de)
- [Cloudflare](https://www.cloudflare.com)
- [dm-drogerie markt](https://www.dm.de/arbeiten-und-lernen/arbeiten-bei-uns/filiadata-c534052.html)
- [HelloFresh](https://www.hellofresh.de)
- [Kilix](http://kilix.fr)
- [Lusk](https://lusk.io)
- [MediaFire](https://m.mediafire.com)
- [N26](https://n26.com)
- [NinjaConcept](https://www.ninjaconcept.com)
- [Optisure](https://www.optisure.de)
- [V2](https://www.v2.com)


## Contributing

This project exists thanks to all the people who contribute.

<a href="https://opencollective.com/fela/contributors/0/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/0/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/1/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/1/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/2/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/2/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/3/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/3/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/4/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/4/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/5/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/5/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/6/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/6/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/7/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/7/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/8/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/8/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/9/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/9/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/10/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/10/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/11/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/11/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/12/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/12/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/13/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/13/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/14/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/14/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/15/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/15/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/16/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/16/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/17/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/17/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/18/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/18/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/19/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/19/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/20/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/20/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/21/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/21/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/22/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/22/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/23/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/23/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/24/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/24/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/25/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/25/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/26/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/26/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/27/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/27/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/28/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/28/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/29/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/29/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/30/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/30/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/31/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/31/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/32/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/32/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/33/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/33/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/34/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/34/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/35/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/35/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/36/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/36/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/37/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/37/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/38/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/38/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/39/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/39/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/40/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/40/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/41/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/41/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/42/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/42/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/43/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/43/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/44/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/44/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/45/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/45/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/46/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/46/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/47/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/47/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/48/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/48/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/49/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/49/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/50/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/50/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/51/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/51/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/52/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/52/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/53/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/53/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/54/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/54/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/55/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/55/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/56/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/56/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/57/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/57/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/58/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/58/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/59/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/59/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/60/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/60/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/61/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/61/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/62/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/62/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/63/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/63/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/64/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/64/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/65/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/65/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/66/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/66/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/67/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/67/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/68/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/68/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/69/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/69/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/70/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/70/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/71/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/71/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/72/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/72/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/73/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/73/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/74/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/74/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/75/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/75/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/76/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/76/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/77/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/77/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/78/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/78/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/79/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/79/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/80/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/80/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/81/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/81/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/82/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/82/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/83/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/83/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/84/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/84/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/85/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/85/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/86/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/86/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/87/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/87/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/88/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/88/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/89/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/89/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/90/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/90/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/91/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/91/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/92/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/92/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/93/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/93/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/94/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/94/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/95/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/95/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/96/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/96/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/97/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/97/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/98/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/98/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/99/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/99/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/contributors/100/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/contributors/100/avatar.svg?requireActive=false"></a>

We highly appreciate any contribution.<br>
For more information follow the [contribution guide](.github/CONTRIBUTING.md).<br>
Also, please read our [code of conduct](.github/CODE_OF_CONDUCT.md).

## Backers

Thank you to all our backers!

<a href="https://opencollective.com/fela/backer/0/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/0/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/backer/1/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/1/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/backer/2/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/2/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/backer/3/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/3/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/backer/4/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/4/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/backer/5/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/5/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/backer/6/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/6/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/backer/7/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/7/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/backer/8/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/8/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/backer/9/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/9/avatar.svg?requireActive=false"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website.

<a href="https://opencollective.com/fela/sponsor/0/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/sponsor/0/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/sponsor/1/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/sponsor/1/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/sponsor/2/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/sponsor/2/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/sponsor/3/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/sponsor/3/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/sponsor/4/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/sponsor/4/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/sponsor/5/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/sponsor/5/avatar.svg?requireActive=false"></a>

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.

<a href="https://app.codesponsor.io/link/pCQU3wY7qzomx7oGR27YYg5s/rofrischmann/fela" rel="nofollow" target="_blank"><img src="https://app.codesponsor.io/embed/pCQU3wY7qzomx7oGR27YYg5s/rofrischmann/fela.svg" style="width: 888px; height: 68px;" alt="Sponsor" /></a>
