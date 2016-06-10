# fela-plugin-prefixer

Uses [inline-style-prefix-all](https://github.com/rofrischmann/inline-style-prefix-all) to add vendor prefixes to both property and value.

**Requires to use  [fela-plugin-fallback-value](../fela-plugin-fallback-value/) afterwards** in order to resolve alternative prefix values which get returned as an array by default. e.g.
```javascript
{
  display: 'flex',
  appearance: 'none'
}
```
will be transformed into:
```javascript
{
  display: ['webkit-box', '-moz-box', '-ms-flexbox', '-webkit-flex', 'flex'],
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  appearance: 'none'
}
```
