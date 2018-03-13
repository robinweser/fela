<h1><img alt="Fela" src="docs/res/logo.png" width="203"/></h1>

Fela is a small, high-performant and framework-agnostic toolbelt to handle state-driven styling in JavaScript.<br>
It is dynamic by design and renders your styles depending on your application state.

It generates atomic CSS and supports all common CSS features such as media queries, pseudo classes, keyframes and font-faces. Fela ships with a powerful plugin API adding e.g. [vendor prefixing](packages/fela-plugin-prefixer) or [fallback value](packages/fela-plugin-fallback-value) support.

Fela can be used with [React](https://github.com/rofrischmann/fela/tree/master/packages/react-fela) or with any other view library. It even supports [React Native](http://fela.js.org/docs/guides/UsageWithReactNative.html).

<img alt="TravisCI" src="https://travis-ci.org/rofrischmann/fela.svg?branch=master"> <a href="https://codeclimate.com/github/rofrischmann/fela/coverage"><img alt="Test Coverage" src="https://codeclimate.com/github/rofrischmann/fela/badges/coverage.svg"></a> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela.svg"> <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-~3kb-brightgreen.svg"> <a href="https://gitter.im/rofrischmann/fela"><img alt="Gitter" src="https://img.shields.io/gitter/room/rofrischmann/fela.svg"></a> <a href="#backers"><img alt="Backers on Open Collective" src="https://opencollective.com/fela/backers/badge.svg"></a> <a href="#sponsors"><img alt="Sponsors on Open Collective" src="https://opencollective.com/fela/sponsors/badge.svg"></a>

## Support Us
Support Robin Frischmann's work on Fela and its ecosystem directly via [**Patreon**](https://www.patreon.com/rofrischmann).

Or support us on [**Open Collective**](https://opencollective.com/fela) to fund community work.<br>
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

## Installation
```sh
yarn add fela
```
You may alternatively use `npm i --save fela`.

## Benefits
* High Predictablity
* Dynamic Styling
* Scoped Atomic CSS
* Dead-Code Elimination
* Framework-Agnostic
* Huge Ecosystem
* Component-Based Styling
* Universal Rendering
* Many CSS Features

## The Gist
Fela's core principle is to consider [style as a function of state](https://medium.com/@rofrischmann/styles-as-functions-of-state-1885627a63f7#.6k6i4kdch).<br>
The whole API and all plugins and bindings are built on that idea.<br>
It is reactive and auto-updates once registered to the DOM.<br>

The following example illustrates the key parts of Fela though it only shows the very basics.

```javascript
import { createRenderer } from 'fela'

// a simple style rule is a pure function of state
// that returns an object of style declarations
const rule = state => ({
  textAlign: 'center',
  padding: '5px 10px',
  // directly use the state to compute style values
  background: state.primary ? 'green' : 'blue',
  fontSize: '18pt',
  borderRadius: 5,
  // deeply nest media queries and pseudo classes
  ':hover': {
    background: state.primary ? 'chartreuse' : 'dodgerblue',
    boxShadow: '0 0 2px rgb(70, 70, 70)'
  }
})


const renderer = createRenderer()

// fela generates atomic CSS classes in order to achieve
// maximal style reuse and minimal CSS output
const className = renderer.renderRule(rule, { 
  primary: true
}) // =>  a b c d e f g
```

The generated CSS output would look like this:
```CSS
.a { text-align: center }
.b { padding: 5px 10px }
.c { background: green }
.d { font-size: 18pt }
.e { border-radius: 5px }
.f:hover { background-color: chartreuse }
.g:hover { box-shadow: 0 0 2px rgb(70, 70, 70) }
```

### Primitive Components
If you're using Fela, you're most likely also using React.<br>
Using the [React bindings](packages/react-fela), you get powerful APIs to create primitive components.<br>
If you ever used [styled-components](https://www.styled-components.com), this will look very familiar.

> **Read**: [Usage with React](http://fela.js.org/docs/guides/UsageWithReact.html) for a full guide.

```javascript
import { createComponent, Provider } from 'react-fela'
import { render } from 'react-dom'

const rule = state => ({
  textAlign: 'center',
  padding: '5px 10px',
  background: state.primary ? 'green' : 'blue',
  fontSize: '18pt',
  borderRadius: 5,
  ':hover': {
    background: state.primary ? 'chartreuse' : 'dodgerblue',
    boxShadow: '0 0 2px rgb(70, 70, 70)'
  }
})

const Button = createComponent(rule, 'button')

render(
  <Provider renderer={renderer}>
    <Button primary>Primary</Button>
    <Button>Default</Button>
  </Provider>,
  document.body
)
```

## Examples
* [Fela + React](http://fela.js.org/docs/introduction/Examples.html#react) ([source](packages/example-react))
    * [React Styleguidist](http://fela.js.org/docs/introduction/Examples.html#styleguidist) ([source](packages/example-with-styleguidist))
    * [React Native](http://fela.js.org/docs/introduction/Examples.html#react-native) ([source](packages/example-react-native))
    * [ReasonReact](https://github.com/astrada/bs-react-fela-examples)
    * [Next](https://github.com/zeit/next.js/tree/master/examples/with-fela)
* [Fela + Preact](http://fela.js.org/docs/introduction/Examples.html#preact) ([source](packages/example-preact))
* [Fela + Inferno](http://fela.js.org/docs/introduction/Examples.html#inferno) ([source](packages/example-inferno))
* [Fela + Angular 2](http://fela.js.org/docs/introduction/Examples.html#angular-2) ([source](packages/example-angular2))
    * [TypeScript](http://fela.js.org/docs/introduction/Examples.html#typescript) ([source](packages/example-angular2-typescript))
* [Fela + HyperScript](https://github.com/ahdinosaur/hyper-fela#example)
* [Fela + Cycle](https://github.com/wcastand/cycle-fela-example)

## Documentation
* [Introduction](http://fela.js.org/docs/Introduction.html)
* [Basics](http://fela.js.org/docs/Basics.html)
* [Advanced](http://fela.js.org/docs/Advanced.html)
* [Usage Guides](http://fela.js.org/docs/UsageGuides.html)
* [Recipes](http://fela.js.org/docs/Recipes.html)
* [API Reference](http://fela.js.org/docs/API.html)
* [Migration Guide](http://fela.js.org/docs/MigrationGuide.html)
* [FAQ](http://fela.js.org/docs/FAQ.html)
* [Feedback](http://fela.js.org/docs/Feedback.html)
* [Thanks](http://fela.js.org/docs/Thanks.html)

## Workshop
If you are coming from CSS and want to learn JavaScript Styling with Fela, there is a full-feature [fela-workshop](https://github.com/tajo/fela-workshop) which demonstrates typical Fela use cases. It teaches all important parts, step by step with simple examples. If you already know other CSS in JS solutions and are just switching to Fela, you might not need to do the whole workshop, but it still provides useful information to get started quickly.

## Posts & Talks
* [**CSS in JS: The Good & Bad Parts**](https://www.youtube.com/watch?v=95M-2YzyTno) ([Slides](https://speakerdeck.com/rofrischmann/css-in-js-the-good-and-bad-parts))<br> - *by [Robin Frischmann](https://twitter.com/rofrischmann)*
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
* [bs-react-fela](https://github.com/astrada/bs-react-fela) - BuckleScript / ReasonReact bindings for Fela
* [catstack](https://github.com/root-systems/catstack) - A modular mad science framework for teams working on production web apps
* [css-in-js-playground](https://github.com/DSchau/css-in-js-playground) - A simple playground for CSS in JS solutions
* [cf-ui](https://github.com/cloudflare/cf-ui) - Cloudflare UI Framework
* [counter-component-with-react-mobx-fela](https://github.com/Mercateo/counter-component-with-react-mobx-fela) - Counter Component using Fela
* [cycle-fela](https://github.com/wcastand/cycle-fela) - Cycle bindings for Fela
* [dogstack](https://github.com/root-systems/dogstack) - A popular-choice grab-bag framework for teams working on production web apps
* [este](https://github.com/este/este) - Starter kit for universal full–fledged React apps build with Fela
* [fela-components](https://github.com/arturmuller/fela-components) - Styling library for React and Fela
* [fela-react-helpers](https://github.com/vlad-zhukov/fela-react-helpers) - A set of useful helpers for Fela
* [fela-react-prop](https://github.com/codepunkt/fela-react-prop) - Generate class names for fela style rule and apply them as property on a wrapped component
* [fela-styles-connector](https://github.com/dustin-H/fela-styles-connector) - Simplified react-fela `connect` with auto-bound styles
* [frejya](https://github.com/benoneal/freyja): Pass styles as props to components
* [gatsby-plugin-fela](https://github.com/mmintel/gatsby-plugin-fela) - Integrates fela with [Gatsby](http://gatsbyjs.org)
* [hyper-fela](https://github.com/ahdinosaur/hyper-fela) - HyperScript bindings for Fela
* [htz-frontend](https://github.com/Haaretz/htz-frontend) - Source for Haaretz frontend app(s)
* [kilvin](https://github.com/rofrischmann/kilvin) - Primitive React Layout Components with Fela
* [olymp](https://github.com/olymp/olymp) - Create and build a next gen app using node, react, cssInJS and other cool stuff
* [preact-fela-simple](https://github.com/pshev/preact-fela-simple) - Super simple Preact bindings for Fela
* [reason-react-starter](https://github.com/drejohnson/reason-react-starter) - A ReasonReact starter kit using Fela
* [storybook-addon-props-fela](https://github.com/Kilix/storybook-addon-props-fela): Document the props of your Fela components in storybook.
* [superslider](https://github.com/adamgiacomelli/superslider) - Slider Component using Fela
* [telaviv](https://github.com/dustin-H/telaviv) - React Universal Rendering
* [vashet](https://github.com/derHowie/vashet) - ClojureScript wrapper for Fela
* [veel](https://github.com/queckezz/veel) - Base react styling components using fela with a design system
* [vue-fela](https://github.com/dustin-H/vue-fela) - Vue bindings for Fela
* [black-box](https://github.com/rocketstation/black-box) - combines behavior, presentation, structure in one place & creates all-in-one components using only JS syntax

## Support
Got a question? Come and join us on [Gitter](https://gitter.im/rofrischmann/fela)! <br>
We'd love to help out. We also highly appreciate any feedback.

## Who's using Fela?

> Your company is using Fela, but is not listed yet? [Add your company / organisation](https://github.com/rofrischmann/fela/edit/master/README.md#L121)

- [abilis](https://www.abilis.de)
- [Bookmyshow](https://in.bookmyshow.com/events)
- [BdP LV RPS](http://www.bdp-rps.de)
- [Cloudflare](https://www.cloudflare.com)
- [dm-drogerie markt](https://www.dm.de/arbeiten-und-lernen/arbeiten-bei-uns/filiadata-c534052.html)
- [HelloFresh](https://www.hellofresh.de)
- [Indoqa](https://www.indoqa.com)
- [Kilix](http://kilix.fr)
- [Lusk](https://lusk.io)
- [MediaFire](https://m.mediafire.com)
- [N26](https://n26.com)
- [Net-A-Porter](https://www.net-a-porter.com/gb/en/porter)
- [NinjaConcept](https://www.ninjaconcept.com)
- [Optisure](https://www.optisure.de)
- [Rocket Station](http://rstation.io)
- [Space Between](https://www.spacebetween.co.uk/)
- [V2](https://www.v2.com)
- [Zendesk](https://www.zendesk.com)


## Contributing

This project exists thanks to all the people who contribute.

We highly appreciate any contribution.<br>
For more information follow the [contribution guide](.github/CONTRIBUTING.md).<br>
Also, please read our [code of conduct](.github/CODE_OF_CONDUCT.md).

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
