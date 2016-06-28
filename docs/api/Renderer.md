# Renderer

A renderer is the core class providing methods to render your styles. It caches every single style that is rendered at any time. Therefore it always has an up-to-date snapshot of your current CSS environment.<br>

You should only have a single renderer which handles all styles of your whole application.

> **Note**: It is not instantiated directly. You have to use one of the `createRenderer` methods to actually get a renderer instance.

## Renderer Methods
* [`renderRule(rule, [props])`](#renderrulerule--props)
* [`renderKeyframe(keyframe, [props])`](#renderkeyframe--props)
* [`renderFont(family, files, [properties])`](#renderfontfamily-files--properties)
* [`renderStatic(style, [selector])`](#renderstaticstyle--reference)
* [`renderToString()`](#rendertostring)
* [`subscribe(listener)`](#subscribelistener)
* [`clear()`](#clear)
* [`getState()`](#getState)

## `renderRule(rule, [props])`
Renders a `rule` using the `props` to resolve it.
### Arguments
1. `rule` (*Function*): A function which satisfies the [rule](../basics/Rules.md) behavior. It **must** return a valid [style object](../basics/Rules.md#styleobject).
2. `props` (*Object?*): An object containing properties to resolve dynamic rule values. *Defaults to an empty object.*


### Returns
(*string*): The CSS class name used to render the `rule`.

### Example
```javascript
import { createSelector } from 'fela'

const renderer = createRenderer(mountNode)

const rule = props => ({
  backgroundColor: 'red',
  fontSize: props.size,
  color: 'blue'
})

renderer.renderRule(rule, { size: '12px' }) // => c0 c0-dzm1d6
renderer.renderRule(rule) // => c0
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
import { createSelector } from 'fela'

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

---

## `renderFont(family, files, [properties])`

Renders a `@font-face` rule using the `family` as reference.

### Arguments
1. `family` (*string*): A font family reference which is later required to use this font face.
2. `files` (*string[]*): An array of valid source paths. It may either be relative (within your project) or absolute (hosted on an external server). It must have one of the following file extensions: `.woff`, `.eof`, `.ttf` or `.svg`.
3. `properties`(*Object?*): Additional font properties which are `fontVariant`, `fontWeight`, `fontStretch`, `fontStyle` and `unicodeRange`.

### Example
```javascript
import { createSelector } from 'fela'

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

# `renderStatic(style, [selector])`

Renders static styles.

### Arguments
1. `style` (*string|Object*): Either a pure CSS string or an object of style declarations.
2. `selector` (*string*): If `style` is passed as an object you **must** specify a `selector` selector.

### Example
```javascript
import { createSelector } from 'fela'

const renderer = createRenderer(mountNode)

// string type style
renderer.renderStatic('html,body{box-sizing:border-box;margin:0}').

// object type style
renderer.renderStatic({
  boxSizing: 'border-box',
  margin: 0
}, 'html,body')
```

### Tips
* Only use static styles for global CSS rules such as resets.
* Use string styles to include legacy and third-party CSS.

##### Pro Tip
You can even reuse existing formatted CSS using [ECMAScript 2015](http://www.ecma-international.org/ecma-262/6.0/) [template strings](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/template_strings).

```javascript
import { createSelector } from 'fela'

const renderer = createRenderer(mountNode)

renderer.renderStatic(`
html, body {
  box-sizing: border-box;
  margin: 0
}`)
```

---

# `renderToString()`

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
import { createSelector } from 'fela'

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
1. `listener` (*Function*): A callback function that is called on every change. It passes the whole new CSS string as first parameter.

### Returns
(*Object*): An object containing the corresponding `unsubscribe`-method.

### Example
```javascript
import { createSelector } from 'fela'

const renderer = createRenderer(mountNode)

const rule = props => ({
  fontSize: props.fontSize,
  color: 'blue'
})

const subscription = renderer.subscribe(css => console.log(css))
renderer.renderRule(rule, { fontSize: '12px '})
// html,body{box-sizing:border-box;margin:0}

// Usubscribing removes the event listener
subscription.unsubscribe()
```
---

## `clear()`
Clears the whole cache.

## `getState()`
Returns the current state of the renderer. Needed to reuse the renderer state from the server on the client side.
