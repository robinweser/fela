# Renderer

The renderer is the most important utility providing methods to render your styles. It caches every single style that is rendered at any time. Therefore it always has an up-to-date snapshot of your current CSS environment.<br>

You should only have a single renderer which handles all styles of your whole application.
To create a new renderer instance, simply use the `createRenderer` method to actually get a renderer instance.

## Methods
* [`renderRule(rule, [props])`](#renderrulerule-props)
* [`renderKeyframe(keyframe, [props])`](#renderkeyframe-props)
* [`renderFont(family, files, [properties])`](#renderfontfamily-files-properties)
* [`renderStatic(style, [selector])`](#renderstaticstyle-reference)
* [`renderToString()`](#rendertostring)
* [`subscribe(listener)`](#subscribelistener)
* [`rehydrate()`](#rehydrate)
* [`clear()`](#clear)

## `renderRule(rule, [props])`
Renders a `rule` using the `props` to resolve it.
### Arguments
1. `rule` (*Function*): A function which satisfies the [rule](../basics/Rules.md) behavior. It **must** return a valid [style object](../basics/Rules.md#styleobject).
2. `props` (*Object?*): An object containing properties to resolve dynamic rule values. *Defaults to an empty object.*


### Returns
(*string*): The CSS class name used to render the `rule`.

### Example
```javascript
import { createRenderer } from 'fela'

const renderer = createRenderer(mountNode)

const rule = props => ({
  backgroundColor: 'red',
  fontSize: props.size,
  color: 'blue'
})

renderer.renderRule(rule, { size: '12px' }) // => c0 c0-dzm1d6
renderer.renderRule(rule) // => c0
```


### Tips & Tricks
To write more advanced and/or simpler rules there are some helpful tips & tricks you might want to know and use:

* **Optional props & Default values**<br>
Sometimes you do not pass all props required to completely resolve all style declarations, but want to use a default value in order to not produce any invalid CSS markup. You can achieve this in two ways. Either with ECMA2015 [default function parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters) or with the logical OR (`||`) operator.

```javascript
// default parameters
const rule = ({ color = 'red' } = {}) => ({
  color: color
})

// OR operator
const rule = props => {
  props = props || {}
  return {
    color: props.color || 'red'
  }
}

rule({ color: 'blue' }) // => { color: 'blue' }
rule({ }) // => { color: 'red' }
```

* **Conditional values**<br>
Some values might only be applied, if a certain condition is fulfilled. Instead of complex and big `if` statements you can use the ternary operator.

```javascript
const rule = ({ type } = {}) => ({
  color: type === 'error' ? 'red' : 'green'
})

rule({ type: 'error' }) // => { color: 'red' }
rule({ }) // => { color: 'green' }
```

* **Flat & Nested props**:<br>
Try not to use nested props at all as the renderer initially triggers rule rendering with an empty props object. Nested props would fail to evaluate if they do not get precisely checked within your rule. If one still wants to use nested props be sure to verify each level separately.

```javascript
const rule = ({ nested }) => ({
  color: nested && nested.is && nested.is.bad || 'green'
})

rule({ nested: { is: { bad: 'red' }} }) // => { color: 'red' }
rule({ }) // => { color: 'green' }
```

* **Calculating and evaluating props:**<br>
Whenever you need to calculate values using the props or use props within expressions, try to do this within the associated render method. It then passes the final props to the rule only.<br>
Doing this keeps your rules clean and declarative and helps preventing issues such as undefined nested props.

```javascript
const rule = ({ fontSize }) => ({
  fontSize: fontSize + 'px' || '10px'
})

const someProps = {
  nested: {
    expression: true
  },
  baseSize: 15
}

rule({ fontSize: nested.expression ? baseSize + 2 : baseSize }) // => { fontSize: 17px }
rule({ }) // => { color: 10px }
```


---

## `renderKeyframe(keyframe, [props])`

Renders a `keyframe` using the `props` to resolve it.

### Arguments
1. `keyframe` (*Function*): A function which satisfies the [keyframe](../basics/Keyframes.md) behavior. It **must** return a valid [keyframe object](../basics/Keyframes.md#keyframeobject).
2. `props` (*Object?*): An object containing properties to resolve dynamic keyframe values. *Defaults to an empty object.*

### Returns
(*string*): The `@keyframes` animation name used to render the `keyframe`.

### Example
```javascript
import { createRenderer } from 'fela'

const renderer = createRenderer(mountNode)

const keyframe = props => ({
  '0%': { color: props.initialColor },
  '33%': { color: 'red' },
  '66%': { color: 'green' },
  '100%': { color: props.initialColor }
})

renderer.renderKeyframe(keyframe, { initialColor: 'blue' }) // => k0-spqp95
renderer.renderKeyframe(keyframe, { initialColor: 'black' }) // => k0--x8hdls
```

### Tips & Tricks
* Be sure to only use [animateable properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties). Other properties will be ignored.
* Keyframe objects **must** at least have the steps `0%` and `100%` or rather `from` and `to`. Otherwise it might not be used at all.

---

## `renderFont(family, files, [properties])`

Renders a `@font-face` rule using the `family` as reference.

### Arguments
1. `family` (*string*): A font family reference which is later required to use this font face.
2. `files` (*string[]*): An array of valid source paths. It may either be relative (within your project) or absolute (hosted on an external server). It must have one of the following file extensions: `.woff`, `.eof`, `.ttf` or `.svg`.
3. `properties`(*Object?*): Additional font properties which are `fontVariant`, `fontWeight`, `fontStretch`, `fontStyle` and `unicodeRange`.

### Example
```javascript
import { createRenderer } from 'fela'

const renderer = createRenderer(mountNode)

const files = [
  '../fonts/Lato.ttf',
  '../fonts/Lato.woff',
  '../fonts/Lato.eof'
]

renderer.renderFont('Lato', files, { fontWeight: 300 })
```
### Caveats
* If you are using relative paths such as `../fonts/Lato.ttf`, keep in mind that it is relative to your `index.html`.

---

## `renderStatic(style, [selector])`

Renders static styles.

### Arguments
1. `style` (*string|Object*): Either a pure CSS string or an object of style declarations.
2. `selector` (*string*): If `style` is passed as an object you **must** specify a `selector` selector.

### Example
```javascript
import { createRenderer } from 'fela'

const renderer = createRenderer(mountNode)

// string type style
renderer.renderStatic('html,body{box-sizing:border-box;margin:0}').

// object type style
renderer.renderStatic({
  boxSizing: 'border-box',
  margin: 0
}, 'html,body')
```

### Tips & Tricks
* Only use static styles for global CSS rules such as resets.
* Use string styles to include legacy and third-party CSS.

##### Pro Tip
You can even reuse existing formatted CSS using [ECMAScript 2015](http://www.ecma-international.org/ecma-262/6.0/) [template strings](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/template_strings).

```javascript
import { createRenderer } from 'fela'

const renderer = createRenderer(mountNode)

renderer.renderStatic(`
html, body {
  box-sizing: border-box;
  margin: 0
}

div {
  display: -webkit-flex;
  display: -moz-flex;
  display: flex
}
`)
```

---

## `renderToString()`

Renders all cached styles into a single CSS string. Styles are grouped in the following order:

1. Fonts
2. Static Styles
3. Rules
4. Media Query Rules (clustered)
5. Keyframes

### Returns
(*string*): Single concatenated CSS string containing all cached styles by that time.

### Example
```javascript
import { createRenderer } from 'fela'

const renderer = createRenderer(mountNode)

const rule = props => ({
  fontSize: props.fontSize,
  color: 'blue'
})

renderer.renderStatic('html,body{box-sizing:border-box;margin:0}').
renderer.renderRule(rule, { fontSize: '12px' })

const markup = renderer.renderToString()

console.log(markup)
// html,body{box-sizing:border-box;margin:0}
// .c0{color:blue}.c0--w5u07{font-size:12px}
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
renderer.renderRule(rule, { fontSize: '12px '})
// { type: 'rule', style: 'color:blue', selector: 'c0', media: '' }
// { type: 'rule', style: 'font-size:12px', selector: 'c0-foo', media: '' }

// Usubscribing removes the event listener
subscription.unsubscribe()
```
---

## `rehydrate()`

Rehydrates the whole style cache by rerunning every single render call. Subscribing change listener will receive two change objects of type `rehydrate` and a `done` flag. One before the rehydration gets trigger and the second right after the rehydration process has finished.

### Example
```javascript
import { createRenderer } from 'fela'

const renderer = createRenderer(mountNode)

const theme = {
  defaultColor: 'blue'
}

const rule = props => ({
  color: theme.defaultColor
})

const className = renderer.renderRule(rule) // c0
console.log(renderer.renderToString())
// .c0{color:blue}

// some changes which need rehydration
theme.defaultColor = 'red'
renderer.rehydrate()

console.log(renderer.renderToString())
// .c0{color:red}
```

---

## `clear()`
Clears the whole cache and updates the DOM node to remove all CSS rules.
