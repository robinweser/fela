# combineRules

A common pattern when styling elements is to have some base styles which get applied to every instance as well as some extended styles which get added based on some condition. Just concatenating classNames may lead to specificity problems as the last rendered rule always wins.<br>
To solve this issue, `combineRules` allows you to compose multiple rules into a single super selector.<br>

Combining rules actually is the best practice in terms of style composition as it prevents property specificity issues by default.

## Arguments
Accepts a list of [Rules](../../advanced/Rules.md). 

## Returns
(*Function*) A super selector which composes all `rules` from left to right.

## Example
```javascript
import { combineRules } from 'fela'

const renderer = createRenderer()

const rule = props => ({
  fontSize: props.fontSize
  color: 'red'
})

const anotherRule = props => ({
  color: 'blue'
})

const superRule = combineRules(rule, anotherRule)

renderer.renderRule(rule, { fontSize: '12px '}) // => a b
renderer.renderRule(anotherRule) // => c
renderer.renderRule(superRule, { fontSize: '12px' }) // => a c
```

The output CSS would be:
```CSS
.a { font-size:12px }
.b { color:red }
.c { color:blue }
```