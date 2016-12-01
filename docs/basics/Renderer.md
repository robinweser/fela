# Renderer

We have learned about all basic renderable elements which are rules, keyframes and fonts. Now we can finally learn how to actually render and use them within our application. In order to do so we need a renderer.

The renderer is a single object that coordinates the whole rendering workflow. It also uses a special caching mechanism to access previously rendered styles faster and reduce the amount of DOM manipulations.

To create a new renderer, Fela provides the [`createRenderer`](../api/createRenderer.md) function.

```javascript
import { createRenderer } from 'fela'

const renderer = createRenderer()
```
We may optionally pass a configuration object as second parameter. Read the [Renderer Configuration](../advanced/RendererConfiguration.md) article for further information.

## Rendering Styles
The renderer provides dedicated render methods for each of the three renderable components which we introduced in the previous articles.

* [renderRule](../api/Renderer.md#renderrulerule-props-defaultprops)
* [renderKeyframe](../api/Renderer.md#renderkeyframe-props)
* [renderFont](../api/Renderer.md#renderfontfamily-files-properties)

> **Tip**: Read the tips and tricks of each render method first. Especially the [renderRule](../api/Renderer.md#renderrulerule-props-defaultprops) tips are very helpful for beginners as well as advanced users.

### renderRule
Takes a [rule](Rules.md) and some `props` to resolve the rule. If no `props` are passed it defaults to an empty object.<br>
It reuses the static subset of a rule to produce less markup.
It returns the rendered CSS class(es).

```javascript
import { createRenderer } from 'fela'

const renderer = createRenderer()

const rule = props => ({
  fontSize: props.fontSize,
  backgroundColor: 'blue',
  color: 'red'
})

renderer.renderRule(rule) // => c1
renderer.renderRule(rule, { fontSize: '12px' }) // => c1 c2
renderer.renderRule(rule, { fontSize: '15px' }) // => c1 c3
```
```CSS
.c1 {
  background-color: blue;
  color: red
}

.c2 {
  font-size: 12px
}

.c3 {
  font-size: 15px
}
```


### renderKeyframe
Takes a [keyframe](Keyframes.md) and some `props` to resolve the keyframe. If no `props` are passed it defaults to an empty object.
It returns the rendered animation name.
It also adds the keyframe with both `@-webkit-` and `@-moz-` prefixes, but we will ignore them here for brevity.

```javascript
import { createRenderer } from 'fela'

const renderer = createRenderer()

const keyframe = props => ({
  from: { color: 'green' },
  to: { color: props.toColor }
})

renderer.renderKeyframe(keyframe, { toColor: 'red' }) // => k1
renderer.renderKeyframe(keyframe, { toColor: 'blue' }) // => k2
```
```CSS
@keyframes k1 {
  from {
    color: green
  }
  to {
    color: red
  }
}

@keyframes k2 {
  from {
    color: green
  }
  to {
    color: blue
  }
}
```

### renderFont
Rendering [fonts](Fonts.md) is a bit different. `renderFont` takes the font family and an array of font source files as mandatory arguments and an optional object containing additional font properties.

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

## Advanced API
Check out the [API reference - Renderer](../api/Renderer.md) to learn about all of its methods. This article only describes the basic rendering methods. It does not include `clear`, `subscribe`, `rehydrate` or even `renderStatic`.

<br>

---

### Related
* [DOM Rendering](../advanced/DOMRendering.md)
* [Server Rendering](../advanced/ServerRendering.md)
* [Renderer Configuration](../advanced/RendererConfiguration.md)
* [API reference - Renderer](../api/Renderer.md)
* [API reference - `createRenderer`](../api/createRenderer.md)
* [FAQ - Renderer](../FAQ.md#renderer)

#### Tools
**[fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native)**<br>
Renderer for React Native
