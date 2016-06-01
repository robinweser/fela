# Getting Started

1. [Installation](#1-installation)
2. [Understanding Selectors](#2-understanding-selectors)
  * 2.1. [Tips & Tricks](#21-tips--tricks)
3. [Pseudo Classes](#3-pseudo-classes)
4. [Media Queries](#4-media-queries)
5. [Animation Keyframes](#5-animation-keyframes)
6. [Font Faces](#6-font-faces)
7. [Global & Third-Party CSS](#7-global--third-party-css)
8. [Rendering](#8-rendering)
  * 8.1. [DOM Renderer](#81-dom-renderer)
  * 8.2. [Server Renderer](#82-server-renderer)
9. [Plugins](#9-plugins)
  * 9.1. [Configuration](#91-configuration)
10. [Middleware](#10-middleware)
  * 10.1. [Configuration](#101-configuration)
11. [Fela with other Libraries](#11-fela-with-other-libraries)
  * [Fela + React](#fela--react)
  * [Fela + Web Components](#fela--web-components)

## 1. Installation
Before we can even start we need to install Fela to our project.

```sh
npm i --save fela
```

We can now either use the new ECMAScript 2015 `import` syntax or the CommonJS `require` syntax. *(The examples will use the `import`-syntax)*

```javascript
// ECMAScript 2015
import Fela from 'fela'

// CommonJS
var Fela = require('fela')
```

## 2. Understanding Selectors
First of all we need understand what a selector is and what they're used for.<br>
Selectors build up the core of your DOM-based CSS environment. A selector is basically just a **pure** function of *props* that returns a plain object containing style declarations. Pure functions produce predictable output, are easy to test and are quite fail-safe. To keep your composer pure you should not:

* Mutate the *props*
* Perform side effects e.g. API calls
* Call non-pure functions e.g. `Date.now()`

```javascript
const selector = props => ({
  fontSize: '15px',
  color: props.color,
  lineHeight: 1.5
})
```

### 2.1. Tips & Tricks
To write even more advanced and simple Selectors there are some helpful tips & tricks you might want to know and use.

* Optional props & Default values
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

* Conditional values
Some values might only be applied if a certain condition is fulfilled. Instead of complex and big `if` statements you can use the ternary operator.

```javascript
const selector = props => ({
  color: props.type === 'error' ? 'red' : 'black'
})

selector({ type: 'error' }) // => { color: 'red' }
selector({ }) // => { color: 'green' }
```


## 3. Pseudo Classes
As pseudo classes are a key feature of CSS they are supported by Fela's Renderer as well. You can easily define them as nested property objects within your selector. You can also nest them to require both pseudo classes to be active.
```javascript
const selector = props => ({
  color: 'red',
  fontSize: '12px',
  ':hover': {
    color: 'blue',
    // they can be nested to produce
    // e.g. :hover:active
    ':active': {
      color: 'yellow'
    }
  },
  ':active': {
    color: 'black'
  }
})
```

## 4. Media Queries
Yet another CSS key feature are media queries. They're used to describe how style get rendered depending on the current device. Just like pseudo classes they can also be nested within your selector. They **must** begin with the `@media` keyword.

```javascript
const selector = props => ({
  color: 'red',
  ':hover': {
    color: 'blue'
  },
  '@media (min-height: 200px)': {
    color: 'yellow',
    // they can be nested to produce e.g.
    // @media (min-height: 200px) and (max-width: 300px)
    '@media (max-width: 300px)': {
      color: 'purple'
    }
  },
  '@media (screen)': {
    color: 'black'
  }
})
```

## 5. Animation Keyframes
Keyframe animations require a special syntax. We achieve this using a dedicated Keyframe Component which Fela provides. It gets instantiated with a single keyframe **composer** which is similar to basic selectors just a plain function of *props* returning an object of frame style declarations.

```javascript
import { Keyframe } from 'fela'

const composer = props => ({
  '0%': {
    color: 'blue'
  },
  '33%': {
    color: props.color,
  },
  '66%': {
    color: 'green'
  },
  '100%': {
    color: 'blue'
  }
})

const keyframe = new Keyframe(composer)
```

## 6. Font Faces
Font faces also require a special syntax which is again provided by Fela's FontFace Component itself.

> Note: You can also pass special font properties, but remember there are [only four valid](api/Fela.md#fontfacefamily-files--properties) properties for @font-face notation.

```javascript
const files = ['../fonts/Arial.ttf', '../fonts/Arial.woff']
const properties = { fontWeight: 300 }

const fontFace = new FontFace('Arial', files, properties)
```

## 7. Global & Third-Party CSS
You most likely also want to define some global CSS rules e.g. some CSS resets. Also frequently you need to include some third-party CSS rules. 

## 8. Rendering
We now know how to use selectors, Keyframes, Fonts and all the CSS features with Fela, but to use them within a real application we still need to render them somehow to produce and attach valid CSS output.<br>
> Note: Before using any Renderer you should first understand how the rendering process works in general. If you're not already familiar with the mechansism please check out [Rendering Mechanism](RenderingMechanism.md) for a detailed explanation.

### 8.1. DOM Renderer
The DOM Renderer is used to directly render Selector variations into a specific DOM node. It is used for client-side rendering and requires a real DOM to be working.
It can basically render into any valid element node though styles will only get applied correctly if a real `<style>` element is used.

```javascript
import { Renderer } from 'fela'
const mountNode = document.getElementsByTagName('style')[0]

const selector = props => ({
  fontSize: props.size || 10 + 'px',
  color: 'red'
})

const renderer = new Renderer(mountNode)

renderer.render(selector) // => c0
renderer.render(selector, { size: 12 }) // => c0 c0-eqz3x

console.log(mountNode.textContent) // => .c0{color:red}.c0-eqz3x{font-size:12px}
```

### 8.2. Server Renderer
The Server Renderer does exactly the same as the DOM Renderer does except actually rendering into a DOM node. It is used for server-side rendering and only caches all the variations. It is used to collect all rendered variations produced on initial render. Using the `renderToString` method afterwards will return a single string containing all styles transformed into valid CSS markup.<br>
This string can now be injected into the provided HTML file.
```javascript
import { Renderer } from 'fela/server'

const selector = props => ({
  fontSize: props.size || 10 + 'px',
  color: 'red'
})

const renderer = new Renderer()

renderer.render(selector) // => c0
renderer.render(selector, { size: 12 }) // => c0 c0-eqz3x

console.log(renderer.renderToString()) // => .c0{color:red}.c0-eqz3x{font-size:12px}
```


## 9. Plugins
Fela is designed to be configured with plugins which gives huge power and flexibility while styling your application.
There are actually two ways to use plugins. You can either pass them to the `render` method or directly instantiate your Renderer with plugins once.

```javascript
import prefixer from 'fela-plugin-prefixer'

// Method 1
const renderer = new Fela.Renderer(mountNode)
renderer.render(selector, { color: 'red' }, [ prefixer() ])

// Method 2
const renderer = new Fela.Renderer(mountNode, { plugins: [ prefixer() ]})
renderer.render(selector, { color: 'red' })
```


### 9.1. Configuration
Some plugins might require some configuration. For example the [custom property](plugins/customProperty) plugin must at least have one custom property mapping. You can pass configuration directly on instantiation.
```javascript
import customProperty from 'fela-plugin-custom-property'

const sizeProperty = size => ({
  width: size + 'px',
  height: size + 'px'
})

renderer.render(selector, { color: 'red' }, [ customProperty({size: sizeProperty}) ])
```

## 10. Middleware
To be completed soon.
### 10.1. Configuration
To be completed soon.

## 11. Fela with other Libraries
### Fela + React
Fela was not explicitly designed for React, but rather is as a result of working with React.<br>
It can be used with any solution, but works perfectly fine together with React - especially if dealing with dynamic & stateful styling.

```javascript
import React, { Component } from 'react'
import { Renderer } from 'fela'

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
```javascript
import { Renderer } from 'fela'

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


class App extends HTMLElement {
    attachedCallback() {
        this.innerHTML = `
            <div class="${renderer.render(selector, { color: 'red' })}">
                I do not have a font-size, but am red.
            </div>
        `
    }
}

document.registerElement('my-app', App)
```
