# `combineRules(...rules)`

A common pattern when styling elements is to have some base styles which get applied to every instance as well as some extended styles which get added based on some condition. Just concatenating classNames may lead to specificity problems as the last rendered rule always wins.<br>
To solve this issue, `combineRules` allows you to compose multiple rules into a single super selector.

## Arguments
1. `...rules` (*arguments*): Functions returning valid [style objects](../basics/Rules.md#styleobject).

## Returns
(*Function*) A super selector which composes all `rules` from left to right.

## Example
```javascript
import { combineRules } from 'fela'

const renderer = createRenderer(mountNode)

const rule = props => ({
  fontSize: props.fontSize
  color: 'red'
})

const anotherRule = props => ({
  color: 'blue'
})

const superRule = combineRule(rule, anotherRule)

renderer.render(rule, { fontSize: '12px '}) // => c0 c0-dzm1d6
renderer.render(anotherRule) // => c1
renderer.render(superRule, { fontSize: '12px' }) // c2 c2-dzm1d6

console.log(renderer.renderToString())
// .c0{color:red}.c0-dzm1d6{font-size:12px}
// .c1{color:blue}
// .c2{color:blue}.c2-dzm1d6{font-size:12px}
```

## Tips
* Try to avoid `combineRules` if possible. If you are using `combineRules` excessively you might have to rethink and refactor your styling technique to achieve a more modular and simple one.
* `combineRules` will always create a new rule which prevents using already cached sub-rules. Therefore it might negatively affect the rendering performance if you are using multiple combined rules.
