# Keyframes

As the name already suggests, keyframes are used to render [CSS animation keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations).

Keyframes are very similar to rules, in that they are also defined as functions of `props` and return objects, but the returned objects have a slightly different shape.

## Keyframe Object
The objects returned by keyframes are called *keyframe objects* if they conform a special shape.<br>Each key in the object must be either a percentage value or the keywords `from` or `to`, which are equivalent to `0%` and `100%`. Those keys again need to reference objects containing all style declarations that should be animated. The nested objects have to conform to a [rule](Rules.md)'s [basic shape](Rules.md#basicshape).

```javascript
const keyframe = props => ({
  '0%': { color: 'black' },
  '33%': { color: props.firstColor },
  '66%': { color: props.secondColor },
  '100%': { color: 'black' }
})
```
<br>

---

### Related
* [Rendering keyframes](Renderer.md#renderkeyframe)
* [API reference - `Renderer.renderKeyframe` ](../api/Renderer.md#renderkeyframe-props)
* [FAQ - Keyframes](../FAQ.md#keyframes)

#### Tools
**[FormidableLabs/react-animations](https://github.com/FormidableLabs/react-animations)**<br>
CSS animations to be used with CSS in JS solutions
