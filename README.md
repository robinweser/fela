<h1 align="center">Fela</h1>
<p align="center">
Dynamic Styling in JavaScript.
<br>
<img alt="TravisCI" src="https://travis-ci.org/rofrischmann/fela.svg?branch=develop">
<a href="https://codeclimate.com/github/rofrischmann/fela/coverage"><img alt="Test Coverage" src="https://codeclimate.com/github/rofrischmann/fela/badges/coverage.svg"></a>
<img alt="npm version" src="https://badge.fury.io/js/fela.svg">
<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-~1.86kb-brightgreen.svg">
</p>
<br>
**Fela** is a fast, universal, dynamic and tiny *(only ~1.86kb)* low-level API to handle Styling in JavaScript. It adds dynamic behavior to extend and modify styles over time. It is considered a low-level API, but serves well in production as a stand-alone solution as well. It has **no dependencies**.

The API is strictly designed alongside numerous [design principles](docs/Principles.md)
While it is build with CSS and web technology in mind, it is not bound to the DOM nor CSS explicitly but build upon basic and abstract Components that can even be used with libraries like React Native.<br>

# Documentation
* [API reference](docs/API.md)
* [Design principles](docs/Principles.md)

# Usage
```javascript
import Fela, { Selector } from 'fela'

// first of all we need a valid DOM element to render into
// preferable a <style> element within document.head
// but you could actually use any valid DOM node
const node = document.getElementById('style-element')

// now we create a custom pure style composer
// the composer could be considered a dynamic template
const composer = props => ({ color: props.color })
const selector = new Selector(composer)

// each time we call render with a new selector variation
// the DOM node will add the rendered selector markup
// it always returns the rendered CSS className as reference
Fela.render(node, selector, { color: 'red' }) // => c0-ds34
Fela.render(node, selector, { color: 'blue' }) // => c0-eqz3x
```

### Fela with React
Fela was not explicitly designed for React, but rather is as a result of working with React.<br>
It can be used with any solution, but works perfectly fine together with React - especially if dealing with dynamic & stateful styling.

```javascript
import React, { Component } from 'react'
import Fela, { Selector } from 'fela'

const node = document.getElementById('style-element')

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
    const className = Fela.render(node, selector, {
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
