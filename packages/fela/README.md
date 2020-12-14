<h1><img alt="Fela" src="website/public/logo.png" width="203"/></h1>

Fela is a small, high-performant and framework-agnostic toolbelt to handle state-driven styling in JavaScript.<br>
It is dynamic by design and renders your styles depending on your application state.

It generates atomic CSS and supports all common CSS features such as media queries, pseudo classes, keyframes and font-faces. Fela ships with a powerful plugin API adding e.g. [vendor prefixing](packages/fela-plugin-prefixer) or [fallback value](packages/fela-plugin-fallback-value) support.

Fela can be used with [React](https://github.com/robinweser/fela/tree/master/packages/react-fela) or with any other view library. It even supports [React Native](http://fela.js.org/docs/guides/UsageWithReactNative.html).

<a href="https://bundlephobia.com/result?p=fela@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela.svg"></a> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela.svg"> <a href="https://spectrum.chat/fela?tab=posts"><img alt="Spectrum" src="https://img.shields.io/badge/support-spectrum-brightgreen.svg"></a>

## Support Us

Support Robin Weser's work on Fela and its ecosystem directly via [**GitHub Sponsors**](https://github.com/sponsors/robinweser).

## Benefits

- Predictable Styling
- Scoped Atomic CSS
- Minimal Bundle Size
- No Specificity Issues
- No Naming Conflicts
- Framework-Agnostic
- Huge Ecosystem
- RTL Support

> [Read more about the benefits](https://fela.js.org/docs/latest/intro/benefits)!

## The Gist

Fela's core principle is to consider [style as a function of state](http://fela.js.org/docs/latest/intro/principles).<br>
The whole API and all plugins and bindings are built on that idea.<br>
It is reactive and auto-updates once registered to the DOM.<br>

The following example illustrates the key parts of Fela though it only shows the very basics.

```javascript
import { createRenderer } from 'fela'

// a simple style rule is a pure function of state
// that returns an object of style declarations
const rule = (state) => ({
  textAlign: 'center',
  padding: '5px 10px',
  // directly use the state to compute style values
  fontSize: state.fontSize + 'pt',
  borderRadius: 5,
  // deeply nest media queries and pseudo classes
  ':hover': {
    fontSize: state.fontSize + 2 + 'pt',
    boxShadow: '0 0 2px rgb(70, 70, 70)',
  },
})

const renderer = createRenderer()

// fela generates atomic CSS classes in order to achieve
// maximal style reuse and minimal CSS output
const className = renderer.renderRule(rule, {
  fontSize: 14,
}) // =>  a b c d e f
```

The generated CSS output would look like this:

```CSS
.a { text-align: center }
.b { padding: 5px 10px }
.c { font-size: 14pt }
.d { border-radius: 5px }
.e:hover { font-size: 16pt }
.f:hover { box-shadow: 0 0 2px rgb(70, 70, 70) }
```

### Primitive Components

If you're using Fela, you're most likely also using React.<br>
Using the [React bindings](packages/react-fela), you get powerful APIs to create primitive components.<br>

> **Read**: [Usage with React](http://fela.js.org/docs/latest/guides/usage-with-react) for a full guide.

```jsx
import * as React from 'react'
import { useFela } from 'react-fela'

const rule = ({ fontSize }) => ({
  textAlign: 'center',
  padding: '5px 10px',
  // directly use the props to compute style values
  fontSize: fontSize + 'pt',
  borderRadius: 5,
  ':hover': {
    fontSize: fontSize + 2 + 'pt',
    boxShadow: '0 0 2px rgb(70, 70, 70)',
  },
})

function Button({ fontSize, children }) {
  const { css } = useFela({ fontSize })

  return <button className={css(rule)}>{children}</button>
}
```

> Check this example on [CodeSandbox](https://codesandbox.io/s/fela-demo-7tsj5)

## Examples

- [Fela + React](http://fela.js.org/docs/introduction/Examples.html#react) ([source](examples/example-react))
  - [React Styleguidist](http://fela.js.org/docs/introduction/Examples.html#styleguidist) ([source](examples/example-with-styleguidist))
  - [React Native](http://fela.js.org/docs/introduction/Examples.html#react-native) ([source](examples/example-react-native))
  - [ReasonReact](https://github.com/astrada/bs-react-fela-examples)
  - [Next](https://github.com/zeit/next.js/tree/master/examples/with-fela)
- [Fela + Preact](http://fela.js.org/docs/introduction/Examples.html#preact) ([source](examples/example-preact))
- [Fela + Inferno](http://fela.js.org/docs/introduction/Examples.html#inferno) ([source](examples/example-inferno))
- [Fela + HyperScript](https://github.com/ahdinosaur/hyper-fela#example)
- [Fela + Cycle](https://github.com/wcastand/cycle-fela-example)
- [Fela + Next.js](https://github.com/vercel/next.js/tree/master/examples/with-fela)

## Documentation

- [Getting Started](http://fela.js.org/docs/latest/intro/getting-started)
- [Ecosystem](http://fela.js.org/docs/latest/intro/ecosystem)
- [Migration Guide](http://fela.js.org/docs/latest/extra/migration)
- [Changelog](https://github.com/robinweser/fela/releases)
- [FAQ](http://fela.js.org/docs/latest/extra/faq)

## Workshop

If you are coming from CSS and want to learn JavaScript Styling with Fela, there is a full-feature [fela-workshop](https://github.com/tajo/fela-workshop) which demonstrates typical Fela use cases. It teaches all important parts, step by step with simple examples. If you already know other CSS in JS solutions and are just switching to Fela, you might not need to do the whole workshop, but it still provides useful information to get started quickly.

## Talks

- [**CSS in JS: The Good & Bad Parts**](https://www.youtube.com/watch?v=95M-2YzyTno) ([Slides](https://speakerdeck.com/robinweser/css-in-js-the-good-and-bad-parts))<br> - _by [Robin Weser](https://twitter.com/robinweser)_
- [**CSS in JS: Patterns**](https://www.webexpo.net/prague2018/talk?id=css-in-js-patterns)<br> - _by [Vojtech Miksu](https://twitter.com/vmiksu)_

## Posts

- [**Style as a Function of State**](https://medium.com/@robinweser/styles-as-functions-of-state-1885627a63f7#.6k6i4kdch)<br> - _by [Robin Weser](https://twitter.com/robinweser)_
- [**CSS in JS: The Argument Refined**](https://medium.com/@steida/css-in-js-the-argument-refined-471c7eb83955#.3otvkubq4)<br> - _by [Daniel Steigerwald](https://twitter.com/steida)_
- [**What is Fela?**](https://davidsinclair.io/thoughts/what-is-fela)<br> - _by [David Sinclair](https://davidsinclair.io)_
- [**Choosing a CSS in JS library**](https://gist.github.com/troch/c27c6a8cc47b76755d848c6d1204fdaf#file-choosing-a-css-in-js-library-md)<br> - _by [Thomas Roch](https://twitter.com/tcroch)_
- [**Introducing Fela 6.0**](https://medium.com/felajs/the-future-of-fela-d4dad2efad00)<br> - _by [Robin Weser](https://twitter.com/robinweser)_
- [**A journey into CSS and then into CSS-in-JS**](https://www.zeolearn.com/magazine/a-journey-into-css-and-then-into-css-in-js)<br> - _by [Prithvi Raju](https://twitter.com/aga5tya)_
- [**CSS In JS — Future of styling components**](https://we-are.bookmyshow.com/css-in-js-future-of-styling-components-ad315eb5448b)<br> - _by [Manjula Dube](https://twitter.com/manjula_dube)_
- [**Styling Components with React Fela**](https://alligator.io/react/styling-with-react-fela/)<br> - _by [Josh Sherman](https://twitter.com/joshtronic)_
- [**The Future of Fela**](https://medium.com/@robinweser/introducing-fela-6-0-289c84b52dd5)<br> - _by [Robin Weser](https://twitter.com/robinweser)_

## Ecosystem

There are tons of useful packages maintained within this repository including plugins, enhancers, bindings and tools that can be used together with Fela. Check the [Ecosystem](http://fela.js.org/docs/latest/intro/ecosystem) documentation for a quick overview.

## Community

Apart from all the packages managed within this repository, there are many community third-party projects that are worth mentioning:

- [aesthetic](https://github.com/milesj/aesthetic) - React style and theme layer with Fela support
- [base-styling-components](https://github.com/pitr12/base-styling-components) - Abstract Box and Text Components
- [bs-react-fela](https://github.com/astrada/bs-react-fela) - BuckleScript / ReasonReact bindings for Fela
- [catstack](https://github.com/root-systems/catstack) - A modular mad science framework for teams working on production web apps
- [css-in-js-playground](https://github.com/DSchau/css-in-js-playground) - A simple playground for CSS in JS solutions
- [cf-ui](https://github.com/cloudflare/cf-ui) - Cloudflare UI Framework
- [counter-component-with-react-mobx-fela](https://github.com/Mercateo/counter-component-with-react-mobx-fela) - Counter Component using Fela
- [cycle-fela](https://github.com/wcastand/cycle-fela) - Cycle bindings for Fela
- [dogstack](https://github.com/root-systems/dogstack) - A popular-choice grab-bag framework for teams working on production web apps
- [fela-components](https://github.com/arturmuller/fela-components) - Styling library for React and Fela
- [fela-react-helpers](https://github.com/vlad-zhukov/fela-react-helpers) - A set of useful helpers for Fela
- [fela-react-prop](https://github.com/codepunkt/fela-react-prop) - Generate class names for fela style rule and apply them as property on a wrapped component
- [fela-styles-connector](https://github.com/dustin-H/fela-styles-connector) - Simplified react-fela `connect` with auto-bound styles
- [frejya](https://github.com/benoneal/freyja): Pass styles as props to components
- [gatsby-plugin-fela](https://github.com/mmintel/gatsby-plugin-fela) - Integrates fela with [Gatsby](http://gatsbyjs.org)
- [hyper-fela](https://github.com/ahdinosaur/hyper-fela) - HyperScript bindings for Fela
- [htz-frontend](https://github.com/Haaretz/htz-frontend) - Source for Haaretz frontend app(s)
- [kilvin](https://github.com/robinweser/kilvin) - Primitive React Layout Components with Fela
- [olymp](https://github.com/olymp/olymp) - Create and build a next gen app using node, react, cssInJS and other cool stuff
- [preact-fela-simple](https://github.com/pshev/preact-fela-simple) - Super simple Preact bindings for Fela
- [reason-react-starter](https://github.com/drejohnson/reason-react-starter) - A ReasonReact starter kit using Fela
- [storybook-addon-props-fela](https://github.com/Kilix/storybook-addon-props-fela): Document the props of your Fela components in storybook.
- [superslider](https://github.com/adamgiacomelli/superslider) - Slider Component using Fela
- [telaviv](https://github.com/dustin-H/telaviv) - React Universal Rendering
- [vashet](https://github.com/derHowie/vashet) - ClojureScript wrapper for Fela
- [veel](https://github.com/queckezz/veel) - Base react styling components using fela with a design system
- [vue-fela](https://github.com/dustin-H/vue-fela) - Vue bindings for Fela
- [black-box](https://github.com/rocketstation/black-box) - combines behavior, presentation, structure in one place & creates all-in-one components using only JS syntax

## Support

Got a question? Come and join us on [Spectrum](https://spectrum.chat/fela)! <br>
We'd love to help out. We also highly appreciate any feedback.<br>
Don't want to miss any update? Follow us on [Twitter](https://twitter.com/felajs).

## Who's using Fela?

> Your company is using Fela, but is not listed yet? [Add your company / organisation](https://github.com/robinweser/fela/edit/master/README.md#L121)

- [abilis](https://www.abilis.de)
- [Bookmyshow](https://in.bookmyshow.com/events)
- [BdP LV RPS](http://www.bdp-rps.de)
- [Cloudflare](https://www.cloudflare.com)
- [dm-drogerie markt](https://www.dm.de)
- [dmTECH](https://www.dmtech.de)
- [Espressive](https://www.espressive.com)
- [Gazzer](https://www.gazzer.io)
- [HelloFresh](https://www.hellofresh.de)
- [Indoqa](https://www.indoqa.com)
- [Kilix](http://kilix.fr)
- [Lusk](https://lusk.io)
- [MediaFire](https://m.mediafire.com)
- [Medium](https://medium.com)
- [Microsoft](https://microsoft.com)
- [N26](https://n26.com)
- [Net-A-Porter](https://www.net-a-porter.com/gb/en/porter)
- [NinjaConcept](https://www.ninjaconcept.com)
- [Optisure](https://www.optisure.de)
- [Robin Weser](http://weser.io)
- [Rocket Station](http://rstation.io)
- [Root Systems](https://www.rootsystems.nz)
- [Space Between](https://www.spacebetween.co.uk/)
- [V2](https://www.v2.com)
- [Volvo Cars](https://www.volvocars.com)
- [Zendesk](https://www.zendesk.com)

## Contributing

This project exists thanks to all the people who contribute.

We highly appreciate any contribution.<br>
For more information follow the [contribution guide](.github/CONTRIBUTING.md).<br>
Also, please read our [code of conduct](.github/CODE_OF_CONDUCT.md).

## License

Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Commons License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](http://weser.io) and all the great contributors.
