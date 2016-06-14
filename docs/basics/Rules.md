# Rules

First of all we need understand what a rule actually is and what they're used for. The name comes, as you might already guess, from CSS itself.<br>

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
The objects returned by rules are called *style objects* if they conform a special shape. Rules can only be rendered if they actually fit this shape for any given props.

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
Pseudo classes are one of the key features of CSS. They let you add interactive behavior to your basic styles. You can easily define them as nested property objects within your rule. You can also nest them to require both pseudo classes to be active.

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
Yet another CSS key feature are [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries). They're used to describe what styles are rendered depending on the current screen width/height, aspect ratio, device etc. Just like pseudo classes they can also be nested within your rule. In addition they can even have nested pseudo classes themselves.

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

## Tips & Tricks
To write even more advanced and simple rules there are some helpful tips & tricks you might want to know and use.

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
const rule = props => ({
  color: props.type === 'error' ? 'red' : 'black'
})

rule({ type: 'error' }) // => { color: 'red' }
rule({ }) // => { color: 'green' }
```
