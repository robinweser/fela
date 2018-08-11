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
  },
  // make sure you are using nested quotes to set the content.
  ':before': {
    content: '" "'
  }
})
```

**Note:**
When using `:before` pseudo selector, make sure you are using nested quotes to set the content. Eg: `content: '" "'`

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


#### 4. Support Queries
Another useful CSS feature are [support queries](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports).<br>
They're used to conditionally apply CSS values **only** if a certain CSS feature is supported by the targeted browser. This helps to provide the best experience for both modern and old browsers.

```javascript
const rule = props => ({
  // fallback value
  display: 'block',
  '@supports (display:flex)': {
    display: 'flex'
  }
})
```

#### 5. Attribute Selectors
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
    // [checked="true"][target]
    '[target]': {
      color: 'purple'
    }
  },
  '[data-name^="A"]': {
    color: 'black'
  }
})
```

#### 6. Child Selectors
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
    '> .third-party': {
      color: 'purple'
    }
  }
})
```

#### 7. Other Selectors
If you are familiar with CSS, you may have noticed that this was just a very small subset of CSS selectors. While we only support the above selectors for a reason, we also understand that there might be some edge cases (mostly with third-party libraries) where you want to use other selectors as well. Therefore we provide the `&`-prefix for nested selectors.

> Warning: This is experimental. It basically renders the selector without any further validation.

```javascript
const rule = props => ({
  color: 'red',
  // .a .sub-class
  '& .sub-class': {
    color: 'blue',
    // they can contain nested objects e.g.
    // .a .sub-class:hover
    ':hover': {
      color: 'black'
    }
  }
})
```

<br>

---

### Related
* [Combined Rules](../advanced/CombinedRules.md)
* [API Reference - `Renderer.renderRule`](../api/fela/Renderer.md#renderrulerule-props-defaultprops)

#### Tools
**[fela-tools/StyleSheet](https://github.com/rofrischmann/fela/blob/master/packages/fela-tools/docs/StyleSheet.md)**<br>
Organize your rules in grouped objects with named keys
