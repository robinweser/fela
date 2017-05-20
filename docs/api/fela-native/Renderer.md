# Renderer

The renderer is the most important utility providing methods to render your styles. It caches every single style that is rendered at any time. Therefore it always has an up-to-date snapshot of your current style environment.<br>

You should only have a single renderer which handles all styles of your whole application.
To create a new renderer instance, simply use the `createRenderer` method to actually get a renderer instance.

## Methods
* [`renderRule(rule, [props])`](#renderrulerule-props)
* [`subscribe(listener)`](#subscribelistener)
* [`clear()`](#clear)

## `renderRule(rule, [props])`
Renders a `rule` using the `props` to resolve it.

### Arguments
1. `rule` (*Function*): A function which satisfies the [rule](../../basics/Rules.md) behavior. It **must** return a valid [style object](../../basics/Rules.md#styleobject).
> Note: In addition to valid style objects, you also ``must``only use React Native supported properties.

2. `props` (*Object?*): An object containing properties to resolve dynamic rule values. *Defaults to an empty object.*

### Returns
(*string*): The style object provided by `StyleSheet.create`.

### Example
```javascript
import { createRenderer } from 'fela'

const renderer = createRenderer(mountNode)

const rule = props => ({
  backgroundColor: 'red',
  fontSize: props.size,
  color: 'blue'
})

renderer.renderRule(rule, { size: 12 })
// => { backgroundColor: 'red', fontSize: 12, color: 'blue' }
renderer.renderRule(rule)
// => { backgroundColor: 'red', color: 'blue' }
```


### Tips & Tricks
To write more advanced and/or simpler rules there are some helpful tips & tricks you might want to know and use:

* **Optional props**<br>
Many rules define declarations that semantically belong together e.g. `alignItems` and `justifyContent`. Still, you might not want to use both every time. Therefore, Fela supports optional props. If a value is not set and thus `undefined` or a string containing `undefined` it is simply removed by default.

```javascript
const rule = props => ({
  justifyContent: props.justify,
  alignItems: props.align
})

renderer.renderRule(rule, { justifyContent: 'center' })
// => { justifyContent: 'center' }
```

* **Default declarations**<br>
Sometimes you do not pass all props required to completely resolve all style declarations, but want to use a default value in order to not produce any invalid CSS markup. You can achieve this in two ways. Either with ECMA2015 [default function parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters) or with the logical OR (`||`) operator.

```javascript
// default parameters
const rule = ({ color = 'red' } = {}) => ({
  color: color
})

// OR operator
const rule = props => ({
  color: props.color || 'red'
})

rule({ color: 'blue' }) // => { color: 'blue' }
rule({ }) // => { color: 'red' }
```

* **Conditional values**<br>
Some values might only be applied, if a certain condition is fulfilled. Instead of complex and big `if` statements you can use the ternary operator.

```javascript
const rule = ({ type }) => ({
  color: type === 'error' ? 'red' : 'green'
})

rule({ type: 'error' }) // => { color: 'red' }
rule({ }) // => { color: 'green' }
```

---

## `subscribe(listener)`

Adds a change `listener` to get notified when changes happen.

### Arguments
1. `listener` (*Function*): A callback function that is called on every change. It passes a change object containing information on what actually got rendered or changed. Every change object at least has a unique `type` and optionally some meta data. In addition it passes the `renderer` that triggered the change.

### Returns
(*Object*): An object containing the corresponding `unsubscribe`-method.

### Example
```javascript
import { createRenderer } from 'fela'

const renderer = createRenderer(mountNode)

const rule = props => ({
  fontSize: props.fontSize,
  color: 'blue'
})

const subscription = renderer.subscribe(console.log)
renderer.renderRule(rule, { fontSize: 12, color: 'blue' })
// { type: 'rule', style: { fontSize: 12, color: 'blue' } }

// Unsubscribing removes the event listener
subscription.unsubscribe()
```

---

## `clear()`
Clears the whole cache.
