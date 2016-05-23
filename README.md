<h1 align="center">Fela</h1>
<p align="center">
Dynamic Styling in JavaScript.
<br>
<img alt="TravisCI" src="https://travis-ci.org/rofrischmann/fela.svg?branch=master">
<a href="https://codeclimate.com/github/rofrischmann/fela/coverage"><img alt="Test Coverage" src="https://codeclimate.com/github/rofrischmann/fela/badges/coverage.svg"></a>
<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-~2.3kb-brightgreen.svg">
</p>
<br>
**Fela** is a fast, universal, dynamic and tiny *(only 0.67kb + 1.64kb fela-dom gzipped)* low-level API to handle Styling in JavaScript. It adds dynamic behavior to extend and modify styles over time. It is considered a low-level API, but serves well in production as a stand-alone solution as well. It has **no dependencies**.

The API is strictly designed alongside numerous [design principles](docs/Principles.md)
While it is build with CSS and web technology in mind, it is not bound to the DOM nor CSS explicitly but build upon basic and abstract Components that can even be used with libraries like React Native.<br>

# Documentation
* [API reference](docs/api/)
* [Design principles](docs/Principles.md)

### Plugins
| name | configurable | size *(gzipped)* | description |
| --- | --- | --- | ------ |
|[prefixer](docs/plugins/Prefixer.md) | no | 3.04kb | Adds vendor prefixes to the styles |
|[fallbackValue](docs/plugins/fallbackValue.md) | no | 0.64kb | Resolves arrays of fallback values |
|[customProperty](docs/plugins/CustomProperty.md) | [yes](docs/plugins/CustomProperty.md#configuration) | 0.42kb | Resolves custom properties |
|[friendlyPseudoClass](docs/plugins/FriendlyPseudoClass.md) | no | 0.48kb |Transforms javascript-friendly pseudo class into valid syntax  |

# Usage
```javascript
import { Selector } from 'fela'
import { Renderer } from 'fela-dom'

// first of all we need a valid DOM element to render into
// preferable a <style> element within document.head
// but you could actually use any valid DOM node>M
const node = document.getElementById('style-element')

// will create a new renderer and bind to the DOM node
const renderer = new Renderer(node)

// now we create a custom pure style composer
// the composer could be considered a dynamic template
const composer = props => ({ color: props.color })
const selector = new Selector(composer)

// each time we call render with a new selector variation
// the DOM node will add the rendered selector markup
// it always returns the rendered CSS className as reference
renderer.render(selector, { color: 'red' }) // => c0-ds34
renderer.render(selector, { color: 'blue' }) // => c0-eqz3x
```
#### Media Queries & Pseudo Classes
Selector also supports pseudo classes by default. They can also get nested multiple times. To apply media query styles we use the second parameter *mediaComposers*.
```javascript
const selector = new Selector(props => ({
  color: 'red',
  // pseudo classes can just be nested
  // within your basic styles
  ':hover': {
    color: 'blue'
  }
}), {
  // media queries are defined within an object
  // passed as second parameter
  'min-height: 200px': props => ({
    color: 'yellow',
    // they can of course also
    // contain pseudo classes
    ':hover': {
      color: 'purple'
    }
  }),
  'screen': props => ({
    color: 'black'
  })
})
```
#### Functional Selectors
If you're used to React you probably know the benefit of pure functional Components. It is quite the same with function selectors.
> Note: To use media query composers you still need to use the full-featured Selector class.

```javascript
const selector = props => ({ color: props.color })
renderer.render(selector, { color: 'blue' })
```

### Fela with Plugins
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

### Fela with React
Fela was not explicitly designed for React, but rather is as a result of working with React.<br>
It can be used with any solution, but works perfectly fine together with React - especially if dealing with dynamic & stateful styling.

```javascript
import React, { Component } from 'react'
import { Selector } from 'fela'
import { Renderer } from 'fela-dom'

const node = document.getElementById('style-element')
const renderer = new Renderer(node)

const selector = new Selector(props => ({
  outline: 'none',
  color: props.color,
  outlineWidth: 0,
  border: 0,
  padding: '10px 8px',
  fontSize: props.size
}))

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


# License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de).
