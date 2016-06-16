# Combined Rules

Right now we only saw some simple examples using only one rule per element, but in reality you often see multiple different CSS classes applied to a single element.

Basically there is no problem to do this in Fela too as you could just concatenate multiple rendered rules as well.

```javascript
import { createRenderer } from 'fela'

const renderer = createRenderer()

const ruleA = props => ({ color: 'red' })
const ruleB = props => ({ fontWeight: 'bold' })

const classNameA = renderer.renderRule(ruleA)
const classNameB = renderer.renderRule(ruleB)

const element = (
  <div className={classNameA + ' ' + classNameB}>
    I am red and bold.
  </div>
)
```

The above example works fine as both style objects are completely disjunct according their properties and values, but we might run into problems if we have different values for the same property.

## Specificity in CSS
To understand the problem, we need to understand what specificity in CSS is. According to [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity):
> Specificity is the means by which browsers decide which CSS property values are the most relevant to an element and, therefore, will be applied. Specificity is based on the matching rules which are composed of CSS selectors of different sorts.

The browser indeed calculates a weight for each CSS property to tell which properties finally get applied to which element. <br>
Actually Fela already simplifies the problem a lot, because we it only renders flat CSS classes and leaves out all the combinators such as `+`, `>`, `~` or ` `. Still there is one thing we need to consider.

### Problem: Order Matters
> When specificity is equal to any of the multiple declarations, the last declaration found in the CSS is applied to the element.

So, if we render two rules, both setting a CSS `color`, the last rendered one always wins. Consider the following use-case:

```javascript
import { createRenderer } from 'fela'

const renderer = createRenderer()

const ruleA = props => ({ color: 'red' })
const ruleB = props => ({ color: 'blue' })

const classNameA = renderer.renderRule(ruleA)
const classNameB = renderer.rendeRule(ruleB)

const element = (
  <div className={classNameA + ' ' + classNameB}>
    I am always blue, no matter which order the className is passed.
  </div>
)
```

## Solution: Combined Rules
Using combined rules we can actually merge multiple rules into a single rule. Again, the order matters. But this time we can determine the order on our own.
To combine rules, Fela provides the [`combineRules`](../api/combineRules.md) helper.

### Example
```javascript
import { createRenderer, combineRules } from 'fela'

const renderer = createRenderer()

const ruleA = props => ({ color: 'red' })
const ruleB = props => ({ color: 'blue' })

const ruleAB = combineRules(ruleA, ruleB)
const ruleBA = combineRules(ruleB, ruleA)

const elementAB = (
  <div className={renderer.renderRule(ruleAB)}>
    I am always blue.
  </div>
)

const elementBA = (
  <div className={renderer.renderRule(ruleBA)}>
    I am always red.
  </div>
)
```
It does not matter which of both rules `ruleA` and `ruleB` gets rendered later or if they get rendered at all. `ruleAB` and `ruleBA` are completely new rules that do not depend their base rules at all.
