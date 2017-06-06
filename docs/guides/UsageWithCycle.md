# Usage with Cycle

Fela was always designed with React in mind, but is **not** bound to React by default. If you want to use it with Cycle, you should also install the unofficial [Cycle bindings for Fela](https://github.com/wcastand/cycle-fela).

```sh
npm i --save cycle-fela
```

### Fela in Cycle

To initiate cycle with fela, you need to :
```javascript
import { makeFelaDomDriver } from 'cycle-fela'
```

`makeFelaDomDriver` should replace your `makeDomDriver` from `@cycle/dom`.

A really basic setup would looks like this:

```javascript

import xs from 'xstream'
import { run } from '@cycle/run'
import { div } from '@cycle/dom'
import { makeFelaDomDriver } from 'cycle-fela'

function main(sources) {
  const vdom$ = xs.of(div('Hello World'))
  return { DOM: vdom$ }
}

run(main, {
  DOM: makeFelaDomDriver('#app')
})
```

#### Use Fela

Once you setup fela, `cycle-fela` will look for the props `component` in your elements to create the style.
`component` must be a function like fela's rules :

```javascript
import xs from 'xstream'
import { run } from '@cycle/run'
import { div } from '@cycle/dom'
import { makeFelaDomDriver } from 'cycle-fela'

function main(sources) {
  const vdom$ = xs.of(
    div(
      { component: () => ({ color: 'red' }) },
      'Hello World'
    )
  )
  return { DOM: vdom$ }
}

run(main, {
  DOM: makeFelaDomDriver('#app')
})
```

`makeFelaDomDriver` takes optional parameters.

An options object which let you pass the fela renderer options like plugins, enhancers.
You can also use it to pass a custom DOMElement for your style with `customStyleNode` and your theme for fela.

the third parameter is an array of [staticRules](http://fela.js.org/docs/api/fela/Renderer.html#renderstaticstyle-reference) for fela.

You can find more informations about the options for `makeFelaDomDriver` [here](https://github.com/wcastand/cycle-fela#makefeladomdriver)

#### createComponent

cycle-fela exposes `createComponent` like react-fela.
[createComponent](https://github.com/wcastand/cycle-fela#createcomponent) help you create presentational components that can be reused in your app.

```javascript
import xs from 'xstream'
import { run } from '@cycle/run'
import { makeFelaDomDriver, createComponent } from 'cycle-fela'

const RedDiv = createComponent(() => ({ color: 'red' }), 'div')

function main(sources) {
  const vdom$ = xs.of(RedDiv('Hello World'))
  return { DOM: vdom$ }
}

run(main, {
  DOM: makeFelaDomDriver('#app')
})
```

## Composition

For composition, you can use `combineRules` e.g:

```javascript
import { combineRules } from 'fela'
import { createComponent } from 'cycle-fela'

const Red = () => ({ color: 'red' })
const Bold = () => ({ fontWeight: 'bold' })

const BoldRed = combineRules(Red, Bold)
export default createComponent(BoldRed, 'span')
```

Or `createComponent` like this:

```javascript
import { createComponent } from 'cycle-fela'

const RedSpan = createComponent(() => ({ color: 'red' }), 'span')
const Bold = () => ({ fontWeight: 'bold' })

export default createComponent(Bold, RedSpan)
```

## Theming

Like `react-fela`, we provide a way to pass a theme to your components.
the theme can be passed through options of `makeFelaDomDriver`:

```javascript
const theme = { primaryColor: 'red' }

makeFelaDomDriver('#app', { theme })
```

## More information

You can find more informations [here](https://github.com/wcastand/cycle-fela) and a complete example [here](https://github.com/wcastand/cycle-fela-example)

### Related
* [cycle-fela](https://github.com/wcastand/cycle-fela)
* [API reference - `combineRules` ](https://github.com/wcastand/fela/blob/master/docs/api/fela/combineRules.md)
