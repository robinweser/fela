# Getting Started

1. [Installation](#1-installation)
2. [Understanding Selectors](#2-understanding-selectors)
  * 2.1. [Functional Selectors](#21-functional-selectors)
  * 2.2. [Tips & Tricks](#22-tips-tricks)
3. [Pseudo Classes](#3-pseudo-classes)
4. [Media Queries](#4-media-queries)
5. [Animation Keyframes](#5-animation-keyframes)
6. [Font Faces](#6-font-faces)
7. [Rendering Selectors](#7-rendering-selectors)
  * 7.1. [Underlaying Mechanism](#71-underlaying-mechanism)
  * 7.2. [DOM Renderer](#72-dom-renderer)
  * 7.3. [Server Renderer](#73-server-renderer)
8. [Plugins](#8-plugins)
  * 8.1. [Configuration](#81-configuration)
9. [Fela with other Libraries](#9-fela-with-other-libraries)
  * [Fela + React](#fela-react)
  * [Fela + Web Components](#fela-web-components)

## 1. Installation
Before we can even start we need to install Fela and FelaDOM to our project.

```sh
npm i --save fela fela-dom
```

We can now either use the new ECMAScript 2015 `import` syntax or the CommonJS `require` syntax. *(The examples will use the `import`-syntax)*

```javascript
// ECMAScript 2015
import Fela from 'fela'
import FelaDOM from 'fela-dom'

// CommonJS
var Fela = require('fela')
var FelaDOM = require('fela-dom')
```

## 2. Understanding Selectors
First of all we need understand what a Selector is and what they're used for.<br>
Selectors build up the core of your DOM-based CSS environment. They are instantiated with a *style composer*. A style composer is basically just a **pure** function of *props* that returns a plain object containing style declarations. Pure functions produce predictable output, are easy to test and are quite fail-safe. To keep your composer pure you should not:

* Mutate the *props*
* Perform side effects e.g. API calls
* Call non-pure functions e.g. `Date.now()`

```javascript
import { Selector } from 'fela'

const composer = props => ({
  fontSize: '15px',
  color: props.color,
  lineHeight: 1.5
})

const selector = new Selector(composer)
```

### 2.1. Functional Selectors
As you might have noticed we need to call `new Selector()` every time we create a new Selector. Yet it technically doesn't do a lot (at least right now) except calling the composer with a given set of *props*. That's why you can use pure functional Selectors too. Actually every *composer* (e.g. the composer from the example above) qualifies as a functional Selector.

> Tip: I recommend using functional Selectors as much as possible. Less code, more readability and simple to test.

```javascript
const selector = props => ({
  fontSize: '15px',
  color: props.color,
  lineHeight: 1.5
})
```

### 2.2. Tips & Tricks
To write even more advanced and simple Selectors there are some helpful tips & tricks you might want to know and use.

1. Optional props & Default values
Sometimes you do not always pass all props required to completely resolve all style declarations, but want to use a default value in order to not produce any invalid CSS markup. You can achieve this in two ways. Either with ECMA2015 [default function parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters) or with the logical OR operator.

```javascript
// default parameters
const selector = ({ color = 'red' } = {}) => ({
  color: color
})

// OR operator
const selector = props => ({
  color: props.color || 'red'
})

selector({ color: 'blue' }) // => { color: 'blue' }
selector({ }) // => { color: 'red' }
```

2. Conditional values
Some values might only be applied if a certain condition is fullfilled. Instead of complex and big `if` statements you can use the ternary operator.

```javascript
const selector = props => ({
  color: props.type === 'error' ? 'red' : 'black'
})

selector({ type: 'error' }) // => { color: 'red' }
selector({ }) // => { color: 'green' }
```


## 3. Pseudo Classes
As pseudo classes are a key feature of CSS they are supported by FelaDOM's Renderer as well. You can easily define them as nested property objects within your style composer. You can also nest them to require both pseudo classes to be active.
```javascript
const selector = props => ({
  color: 'red',
  fontSize: '12px',
  // if is hovered
  ':hover': {
    color: 'blue',
    // if is hovered AND active
    ':active': {
      color: 'yellow'
    }
  },
  // if is active
  ':active': {
    color: 'black'
  }
})
```

## 4. Media Queries
Yet another CSS key feature are media queries. They're used to describe how style get rendered depending on the current device. Unlike pseudo classes they can **not** be used directly with basic isomorphic Selectors. We need to use special extended Selectors called MediaSelectors which are provided by FelaDOM directly. They accept a simple composer as well as multiple media composers.

```javascript
import { MediaSelector } from 'fela-dom'

const composer = props => ({
  color: 'red',
  ':hover': {
    color: 'blue'
  }
})

const mediaComposer = {
  'min-height: 200px': props => ({
    color: 'yellow',
    ':hover': {
      color: 'purple'
    }
  }),
  'screen': props => ({
    color: 'black'
  })
}

const mediaSelector = new FelaDOM.MediaSelector(composer, mediaComposer)
```

## 5. Animation Keyframes
To be completed soon.
## 6. Font Faces
To be completed soon.

## 7. Rendering Selectors
We now know how to use Selectors, Keyframes, Fonts and all the CSS features with Fela, but to use them within a real application we still need to render them somehow to produce and attach valid CSS output.

### 7.1. Underlaying Mechanism
Before using any Renderer you should first understand how the rendering process works in general. Both Renderer use some kind of cache to memorize rendered Selectors in order to reuse them every time the same *Selector variation* is rendered again. A Selector variation is considered a pair of the used *props* and the rendered styles output. This prevent dublication and improves performance on future rendering cycles. It also prevents unnecessary DOM manipulations.
<br>
The Renderer therefore always has an up-to-date version of all rendered styles during the whole application lifetime which can be rendered to a DOM node or a string at any given time.

#### Unique classNames
Each time a Selector is rendered the Renderer generates a reference className which is returned to be used within the application. The className is generated from a unique selector reference ID as well as a content-based hash of the passed props what makes it unique throughout the whole application.

### 7.2. DOM Renderer
The DOM Renderer is used to directly render Selector variations into a specific DOM node. It is used for client-side rendering and requires a real DOM to be working.
It can basically render into any valid element node though styles will only get applied correctly if a real `<style>` element is used.

```javascript
import { Renderer } from 'fela-dom'
const mountNode = document.getElementsByTagName('style')[0]

const selector = props => ({
  fontSize: props.size || 10 + 'px',
  color: 'red'
})

const renderer = new Renderer(mountNode)

renderer.render(selector) // => c0-s
renderer.render(selector, { size: 12 }) // => c0-eqz3x

console.log(mountNode.textContent) // => .c0-s{font-size:10px;color:red}.c0-eqz3x{font-size:12px;color:'red'}
```

### 7.3. Server Renderer
The Server Renderer does exactly the same as the DOM Renderer does except actually rendering into a DOM node. It is used for server-side rendering and only caches all the variations. It is used to collect all rendered variations produced on initial render. Using the `renderToString` method afterwards will return a single string containing all styles transformed into valid CSS markup.<br>
This string can now be injected into the provided HTML file.
```javascript
import { Renderer } from 'fela-dom/server'

const selector = props => ({
  fontSize: props.size || 10 + 'px',
  color: 'red'
})

const renderer = new Renderer()

renderer.render(selector) // => c0-s
renderer.render(selector, { size: 12 }) // => c0-eqz3x

console.log(renderer.renderToString()) // => .c0-s{font-size:10px;color:red}.c0-eqz3x{font-size:12px;color:'red'}
```


## 8. Plugins
Fela is designed to be configured with plugins which gives huge power and flexibility while styling your application.
There are actually two ways to use plugins. You can either pass them to the `render` method directly or enhance your Renderer with plugins once.

```javascript
import { enhanceWithPlugins } from 'fela'
import prefixer from 'fela-plugin-prefixer'

// Method 1
renderer.render(selector, { color: 'red' }, [ prefixer() ])

// Method 2
const enhancedRenderer = enhanceWithPlugins(renderer, [ prefixer() ])
enhancedRenderer.render(selector, { color: 'red' })
```


### 8.1. Configuration
Some plugins might require some configuration. For example the [custom property](plugins/customProperty) plugin must at least have one custom property mapping. You can pass configuration directly on instantiation.
```javascript
import customProperty from 'fela-plugin-custom-property'

const sizeProperty = size => ({
  width: size + 'px',
  height: size + 'px'
})

renderer.render(selector, { color: 'red' }, [ prefixer({size: sizeProperty}) ])
```

## 9. Fela with other Libraries
### Fela + React
Fela was not explicitly designed for React, but rather is as a result of working with React.<br>
It can be used with any solution, but works perfectly fine together with React - especially if dealing with dynamic & stateful styling.

```javascript
import React, { Component } from 'react'
import { Renderer } from 'fela-dom'

const node = document.getElementById('style-element')
const renderer = new Renderer(node)

const selector = props => ({
  outline: 'none',
  color: props.color,
  outlineWidth: 0,
  border: 0,
  padding: '10px 8px',
  fontSize: props.size
})

// A simple React Component to choose a font-size
class FontSize extends Component {
  constructor() {
    super(...arguments)
    this.state = { fontSize: 15 }
    this.resize = this.resize.bind(this)
  }

  resize(size) {
    this.setState({ fontSize: size })
  }

  render() {
    // passes values from both props and state
    // to fully resolve the selector composer
    const className = renderer.render(selector, {
      size: this.state.fontSize,
      color: this.props.color
    })

    return <input
      className={className}
      onInput={this.resize}
      defaultValue={this.state.fontSize}
      type="number" />
  }
}

// This will render an input element with blue text color
// it let's you choose a font-size which will then
// get directly applied to the input text itself
ReactDOM.render(
  <FontSize color="red" />,
  document.getElementById('app')
)
```

### Fela + Web Components
To be completed soon.
