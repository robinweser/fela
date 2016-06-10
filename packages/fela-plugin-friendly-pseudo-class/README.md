# fela-plugin-friendly-pseudo-class

Writing CSS pseudo classes within a plain JavaScript object sadly is sometimes painful as the default syntax is not really JavaScript-friendly.<br>

This plugins provides support for JavaScript-friendly pseudo class syntax with an `on`-prefix. e.g.

```javascript
{
  onHover: {
    color: 'red'
  }
}
```
will be transformed into:
```javascript
{
  ':hover': {
    color: 'red'
  }
}
```
