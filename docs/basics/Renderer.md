# Renderer

We have learned about all basic renderable elements which are rules, keyframes and fonts. Now we can finally learn how to actually render and use them within our application.

As the header tells, we are talking about the renderer. The renderer is a single object that coordinates the whole rendering workflow. It also uses a special caching mechanism to access previously rendered styles faster and to reduce the amount of DOM manipulations.

To actually create a new renderer, Fela provides the [`createRenderer`](../api/createRenderer.md)-method.

```javascript
import { createRenderer } from 'fela'

const renderer = createRenderer()
```
We may optionally pass a configuration object as second parameter. Read the [Renderer Configuration](../recipes/RendererConfiguration.md) article for further information.

## Rendering Styles
The renderer provides dedicated render methods for each of the three renderable components which we introduced in the previous articles.

* [renderRule](../api/Renderer.md#renderrulerule--props)
* [renderKeyframe](../api/Renderer.md#renderkeyframe--props)
* [renderFont](../api/Renderer.md#renderfontfamily-files--properties)

### renderRule
Takes a [rule](Rules.md) and some `props` to resolve the rule. If no `props` are passed it defaults to an empty object. It reuses the static subset of a rule to produce less markup.<br>
It returns the rendered CSS class(es).

```javascript
import { createRenderer } from 'fela'

const renderer = createRenderer()

const rule = props => ({
  fontSize: props.fontSize,
  background-color: 'blue',
  color: 'red'
})

renderer.renderRule(rule) // => .c0
renderer.renderRule(rule, { fontSize: '12px' }) // => .c0 .c0--w5u07
renderer.renderRule(rule, { fontSize: '15px' }) // => .c0 .c0--w5rs4
```
```CSS
.c0 {
  background-color: blue;
  color: red
}

.c0--w5u07 {
  font-size: 12px
}

.c0--w5rs4 {
  font-size: 15px
}
```


### renderKeyframe
Takes a [keyframe](Keyframes.md) and some `props` to resolve the keyframe. If no `props` are passed it defaults to an empty object.
It returns the rendered animation name.
> It also adds the keyframe with both `@-webkit-` and `@-moz-` prefixes. We will ignore them here.

```javascript
import { createRenderer } from 'fela'

const renderer = createRenderer()

const keyframe = props => ({
  from: { color: 'green' },
  to: { color: props.toColor }
})

renderer.renderKeyframe(keyframe, { toColor: 'red' }) // => .k0--aqbnkn
renderer.renderKeyframe(keyframe, { toColor: 'blue' }) // => .k0-mh8wzm
```
```CSS
@keyframes k0--aqbnkn {
  from {
    color: green
  }
  to {
    color: red
  }
}

@keyframes k0-mh8wzm {
  from {
    color: green
  }
  to {
    color: blue
  }
}
```

### renderFont
Rendering [fonts](Fonts.md) is a bit different. It takes the font family and an array of font source files. Optionally it takes additional font properties.

```javascript
import { createRenderer } from 'fela'

const renderer = createRenderer()

const files = [
  './fonts/Lato.ttf',
  './fonts/Lato.woff'
]

renderer.renderFont('Lato', files)
renderer.renderFont('Lato-Bold', files, { fontWeight: 'bold' })
```
```CSS
@font-face {
  font-family: 'Lato';
  src: url('./fonts/Lato.ttf') format(truetype),
       url('./fonts/Lato.woff') format(woff)
}

@font-face {
  font-family: 'Lato-Bold';
  src: url('./fonts/Lato.ttf') format(truetype),
       url('./fonts/Lato.woff') format(woff);
  font-weight: bold
}
```

## Subscription
The renderer also manages subscriptions. We can add a change listener to get updated every time an actual change is emitted. Though not every render necessarily emits a change as we can often reuse previously rendered styles from the cache.

```javascript
import { createRenderer } from 'fela'

const renderer = createRenderer()

const rule = props => ({
  fontSize: props.fontSize,
  background-color: 'blue',
  color: 'red'
})

// subscribing returns an subscription object including
// the unsubscribe method to later remove the change listener
const subscription = renderer.subscribe(css => console.log(css))
renderer.renderRule(rule)
// => '.c0{background-color:blue;color:red}'
renderer.renderRule(rule, { fontSize: '12px' })
// => '.c0{background-color:blue;color:red}.c0--w5u07{font-size:12px}'

// stops logging changes
subscription.unsubscribe()
```

## Clearing Styles
Finally the renderer also provides a `clear`-method to clear the whole cache.

```javascript
import { createRenderer } from 'fela'

const renderer = createRenderer()

const rule = props => ({
  fontSize: props.fontSize,
  background-color: 'blue',
  color: 'red'
})

const subscription = renderer.subscribe(css => console.log(css))
renderer.renderRule(rule)
// => '.c0{background-color:blue;color:red}'
renderer.renderRule(rule, { fontSize: '12px' })
// => '.c0{background-color:blue;color:red}.c0--w5u07{font-size:12px}'

renderer.clear()
// => ''
```
