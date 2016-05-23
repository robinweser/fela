# Prefixer

Uses [inline-style-prefix-all](https://github.com/rofrischmann/inline-style-prefix-all) to add vendor prefixes to both property and value.

Needs to run **before** the [fallbackValue](FallbackValue.md) plugin in order to resolve alternative prefix values which get returned as an array by default. e.g.
```javascript
{
  display: 'flex'
}
```
will be transformed into:
```javascript
{
  display: ['webkit-box', '-moz-box', '-ms-flexbox', '-webkit-flex', 'flex']
}
```
