# Fela API

* [Selector(composer)](#selectorcomposer)

## `Selector(composer)`
**Function\<composer>**

Instantiates a new Selector with a pure style `composer`.

```javascript
const composer = props => ({
  color: props.color,
  fontSize: props.fontSize,
  lineHeight: 1.4,
  display: 'flex'
})

const selector = new Fela.Selector(composer)
```
