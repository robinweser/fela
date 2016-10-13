# Rules

We need to understand what rules actually are and what they're used for. The name comes, as you might have already guessed, from CSS itself.<br>

In CSS a rule is defined as a pair of selector(s) and style declaration(s) as this image from [MDN](https://developer.mozilla.org/docs/Web/CSS/Syntax) shows:<br>
![MDN - CSS Rules](https://mdn.mozillademos.org/files/3668/css%20syntax%20-%20ruleset.png)

In Fela you do not need to set the selector as it is generated automatically. Also instead of using static style declarations, every rule instead is a pure function of `props` that returns a *style object*. <br>
```javascript
(props) => ({ /* style declarations */ })
```
Pure functions produce predictable output, are easy to test and are quite fail-safe. To keep your selectors pure you should not:

* Mutate the *props*
* Perform side effects e.g. API calls
* Call non-pure functions e.g. `Date.now()`


## Style Object
The objects returned by rules are called *style objects*, if they conform a special shape. Rules can only be rendered if they actually fit this shape for any given props.

#### 1. Basic Shape
First of all there is the basic shape which just consists of simple style declarations.<br>
Properties should be written in camel-case.

```javascript
const rule = props => ({
  fontSize: '15px',
  color: props.color,
  lineHeight: 1.5
})
```

#### 2. Pseudo Classes
Pseudo classes are one of the key features of CSS. They let you add interactive behavior to your basic styles. You can easily define them as nested property objects within your rules. You can also nest them to require both pseudo classes to be active.

```javascript
const rule = props => ({
  color: 'red',
  fontSize: '12px',
  ':hover': {
    color: 'blue',
    // they can be nested to achieve
    // e.g. :hover:active
    ':active': {
      color: 'yellow'
    }
  },
  ':active': {
    color: 'black'
  }
})
```

#### 3. Media Queries
Yet another CSS key feature are [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries). They're used to describe what styles are rendered depending on the current screen width/height, aspect ratio, device etc. Just like pseudo classes they can also be nested within your rules. In addition they can even have nested pseudo classes themselves.

```javascript
const rule = props => ({
  color: 'red',
  ':hover': {
    color: 'blue'
  },
  '@media (min-height: 200px)': {
    color: 'yellow',
    // they can be nested to achieve e.g.
    // @media (min-height: 200px) and (max-width: 300px)
    '@media (max-width: 300px)': {
      color: 'purple'
    }
  },
  '@media (screen)': {
    color: 'black'
  }
})
```

#### 4. Attribute Selectors
To be able to style elements according to their attributes, Fela introduces a special syntax for nested attribute selectors. It allows dynamic styles depending on passed attributes which adds another level of precise element selection.

The API reflects the original [CSS attribute selectors](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Attribute_selectors) and therefore allows the following operators:
* `=`: attributes **equal** to a value
* `~=`: attributes **containing** a value
* `^=`: attributes **beginning** with a value
* `|=`: attributes **starting** with a value (whole word)
* `$=`: attributes **ending** with a value

Only passing the attributes checks if the attribute is present at all.

> **Note**: Use attribute selectors with caution as they add complexity to your styling and have higher specificity as other selectors.

```javascript
const rule = props => ({
  color: 'red',
  '[checked="true"]': {
    color: 'yellow',
    // they can be nested to achieve e.g.
    // [checked="true"][traget]
    '[target]': {
      color: 'purple'
    }
  },
  '[data-name^="A"]': {
    color: 'black'
  }
})
```

#### 5. Child Selector
Fela also supports a special syntax for child element styling know as [child selectors](https://developer.mozilla.org/es/docs/Web/CSS/Child_selectors) in CSS.
They should only be used for third-party class manipulation or semantic problems e.g. *parent component which defines how child components are ordered depending on some state.*

> **Note**: Use child selectors with caution as they add complexity to your styling and have higher specificity as other selectors.

```javascript
const rule = props => ({
  color: 'red',
  '> h1': {
    color: 'blue',
    // they can contain nested objects e.g.
    // > h1:hover
    ':hover': {
      color: 'black'
    }
  },
  '> #hardcoded': {
    color: 'yellow',
    // they can be nested to achieve e.g.
    // > #hardcoded > .third-party
    '.third-party': {
      color: 'purple'
    }
  }
})
```

## Tips & Tricks
To write more advanced and/or simpler rules there are some helpful tips & tricks you might want to know and use:

* **Optional props & Default values**<br>
Sometimes you do not pass all props required to completely resolve all style declarations, but want to use a default value in order to not produce any invalid CSS markup. You can achieve this in two ways. Either with ECMA2015 [default function parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters) or with the logical OR (`||`) operator.

```javascript
// default parameters
const rule = ({ color = 'red' } = {}) => ({
  color: color
})

// OR operator
const rule = props => {
  props = props || {}
  return {
    color: props.color || 'red'
  }
}

rule({ color: 'blue' }) // => { color: 'blue' }
rule({ }) // => { color: 'red' }
```

* **Conditional values**<br>
Some values might only be applied, if a certain condition is fulfilled. Instead of complex and big `if` statements you can use the ternary operator.

```javascript
const rule = ({ type } = {}) => ({
  color: type === 'error' ? 'red' : 'green'
})

rule({ type: 'error' }) // => { color: 'red' }
rule({ }) // => { color: 'green' }
```

* **Flat & Nested props**:<br>
Try not to use nested props at all as the renderer initially triggers rule rendering with an empty props object. Nested props would fail to evaluate if they do not get precisely checked within your rule. If one still wants to use nested props be sure to verify each level separately.

```javascript
const rule = ({ nested }) => ({
  color: nested && nested.is && nested.is.bad || 'green'
})

rule({ nested: { is: { bad: 'red' }} }) // => { color: 'red' }
rule({ }) // => { color: 'green' }
```

* **Calculating and evaluating props:**<br>
Whenever you need to calculate values using the props or use props within expressions, try to do this within the associated render method. It then passes the final props to the rule only.<br>
Doing this keeps your rules clean and declarative and helps preventing issues such as undefined nested props.

```javascript
const rule = ({ fontSize }) => ({
  fontSize: fontSize + 'px' || '10px'
})

const someProps = {
  nested: {
    expression: true
  },
  baseSize: 15
}

rule({ fontSize: nested.expression ? baseSize + 2 : baseSize }) // => { fontSize: 17px }
rule({ }) // => { color: 10px }
```

<br>

---

### Related
* [Combined rules](../advanced/CombinedRules.md)
* [API reference - `Renderer.renderRule`](../api/createRenderer.md)
* [FAQ - Rules](../FAQ.md#rules)

#### Tools
**[fela-stylesheet](https://github.com/rofrischmann/fela-stylesheet)**<br>
Organize your rules grouped StyleSheets
