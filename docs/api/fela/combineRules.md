# `combineRules(...rules)`

A common pattern when styling elements is to have some base styles which get applied to every instance as well as some extended styles which get added based on some condition. Just concatenating classNames may lead to specificity problems as the last rendered rule always wins.<br>
To solve this issue, `combineRules` allows you to compose multiple rules into a single super selector.<br>

Combining rules actually is the best practice in terms of style composition as it prevents property specificity issues by default.

## Arguments
1. `...rules` (*arguments*): Functions returning valid [style objects](../../basics/Rules.md#styleobject).

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

const superRule = combineRules(rule, anotherRule)

renderer.renderRule(rule, { fontSize: '12px '}) // => c1 c2
renderer.renderRule(anotherRule) // => c3
renderer.renderRule(superRule, { fontSize: '12px' }) // c4 c5

console.log(renderer.renderToString())
// .c1{color:red}.c2{font-size:12px}
// .c3{color:blue}
// .c4{color:blue}.c5{font-size:12px}
```
