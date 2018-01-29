# fela-identifier

<img alt="npm version" src="https://badge.fury.io/js/fela-identifier.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-identifier.svg">

This enhancer allows you to create rules for which the renderer will generate unique class names.

## Installation
```sh
yarn add fela-identifier
```
You may alternatively use `npm i --save fela-identifier`.

## Problem
Sometimes it is necessary to additionally stylize (for example, highlight) some DOM element when manipulating (for example, when hovering) with the parent.
In classical CSS this would look something like this:
```css
.parent-element:hover .child-element {
  background-color: red; 
}
```
But with Fela, this is not so easy, because you do not assign classes yourself.

## Solution
Create a rule for which the renderer will predictably generate the same unique class name.

## Usage
```javascript
import { createRenderer } from 'fela'
import createIdentifier from 'fela-identifier'

const identifier = createIdentifier()
const renderer = createRenderer({
  enhancers: [ identifier ]
})

const childElementRule = identifier()
const parentElementRule = () => ({
  [`:hover .${childElementRule}`]: {
    backgroundColor: 'red',
  }
})

renderer.renderRule(childElementRule)
// => 'fela-identifier-0'
renderer.renderRule(parentElementRule)
// => 'a'
```

outputs

```css
.a:hover .fela-identifier-0 {
  background-color: red
}
```

### API

The module exports a function that creates an `identifier`. The `identifier` is both an enhancer and a factory of unique rules. As a factory of unique rules, the `identifier` has the following API:

##### Arguments
1. `name` (*String*): This is a string that can be used to produce an identifier. Sometimes this is convenient for debugging or visibility.

##### Returns
(*Function*): A Fela rule that can be rendered. It also has a field `className` and an overridden method `toString` that returns the same value as the field `className`. You can use it like this: 
```js
import createIdentifier from 'fela-identifier'

const identifier = createIdentifier()

const rule = identifier()
const className = rule.className
rule.toString()
```

`!!!Attention!!!` *Do not use the `identifier` as a factory before you connect it as an enhancer. This will result in a runtime error.*


### Configuration
##### Options

| Option | Value | Default | Description |
| ------ | --- | ------------ | --- |
| prefix | *(string)* | `fela-identifier` | a prefix to be inserted at the beginning of the identifying class |
| generator | *(`name`: string, `index`: number) => string* | just returns the `index` | function that is responsible for generating identifiers based on the name and index |

##### Example
```javascript
import { createRenderer } from 'fela'
import createIdentifier from 'fela-identifier'
import uuidv4 from 'uuid/v4'
import hash from 'object-hash'

const identifier = createIdentifier({
  prefix: 'my-custom-prefix',
  generator: (name, index) => `${hash([name, index])}-${uuidv4()}`,
})

const renderer = createRenderer({
  enhancers: [ identifier ]
})
```

## Examples

Usage with `react-fela`:

```js
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider, connect } from 'react-fela'
import { createRenderer } from 'fela'
import createIdentifier from 'fela-identifier'

export const identifier = createIdentifier()
export const renderer = createRenderer({
  enhancers: [ identifier ],
})

let Component = ({ styles }) => (
    <div className={styles.parent}>
      Some Parent Content
      <div className={styles.child}>
        Some Child Content
      </div>
    </div>
)

const child = identifier()
Component = connect({
  parent: {
    [`:hover .${child}`]: {
      backgroundColor: 'red',
    }
  },
  child
})(Component)

ReactDOM.render(
  <Provider renderer={renderer}>
    <Component />
  </Provider>,
  document.getElementById("root"),
)
```

You can combine identifying rules with styles and with each other:

```js
import { createRenderer, combineRules } from 'fela'
import createIdentifier from 'fela-identifier'

export const identifier = createIdentifier()
export const renderer = createRenderer({
  enhancers: [ identifier ],
})

const firstId = identifier('first')
const secondId = identifier('second')
const someStyle = () => ({
  fontSize: '20px',
  backgroundColor: 'red',
})

const combinedRule = combineRules(
  firstId,
  secondId,
  someStyle,
)

renderer.renderRule(combinedRule)
// => 'a b fela-identifier-first-0 fela-identifier-second-1'
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
