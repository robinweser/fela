# Caveats

Like every solution, also Fela is not **the** ultimate solution and should not be blindly used without evaluating its benefits and disadvantages. The strict design decisions also have some caveats.

#### 1. Computed Selectors
The unique computed selectors are quite handy as they [prevent namespacing conflicts](Benefits.md#local-namespace). But they are not designed to be human-readable nor to be mutated at all. <br>
However, if you need to mutate the styles from outside, consider providing an API to pass the props.

#### 2. Shorthand & Longhand Properties
Probably the biggest downside of using atomic CSS design, is the fact that shorthand and longhand properties can't safely be mixed in a single rule.
```javascript
const rule = props => ({
  border: '1px solid black',
  borderColor: 'red'
})
```

The above example will not unconditionally render a red border as we can't tell which rule might be rendered before and therefore appears first in the stylesheet. There might have been another rule that renders `borderColor: red` which is rendered before this rule. Now rendering this rule, would cause `border: 1px solid black` to always be preferred based on how CSS specificity works.

To solve this problem, you should not use shorthand and longhand properties together in a single rule. Perhaps the best is to avoid them at all. To give you an example, here's how you would write the above:

```javascript
const rule = props => ({
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: 'red'
})
```
It might be more code to type, but its also more self-explanatory and descriptive.<br>
> PS: There will soon be a tool, that automatically checks for mixed shorthand / longhand properties and throws a warning if used together.

#### 3. CSS properties that contain double quotes
For css properties that need double quotes, make sure you are using nested quotes in your code. e.g.:
```javascript
const rule = props => ({
  ':before': {
    content: '" "'
  }
})
```
