# Keyframes

As the name might already hint, they are used to render [CSS animation keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations).

Keyframes are very similar to rules. They are also defined as functions of `props` and also return an object but with a slightly different shape, which we like to call *keyframe objects*.

## Keyframe Object
The objects returned by keyframes are called *keyframe objects* if they conform a special shape.<br>Each key in the object must be either a percentage value or one of the keywords `from` and `to` which are equivalent to `0%` and `100%`. Those keys again need to reference objects containing all style declarations that should be animated. They have the same shape as [rule](Rules.md)'s [basic shape](Rules.md#basicshape).

```javascript
const keyframe = props => ({
  '0%': { color: 'black' },
  '33%': { color: props.firstColor },
  '66%': { color: props.secondColor },
  '100%': { color: 'black' }
})
```

## Tips & Tricks
* Be sure to only use [animateable properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties). Other properties will be ignored.
* Keyframe objects **must** at least have the steps `0%` and `100%` or rather `from` and `to`. Otherwise it might not be used at all.
