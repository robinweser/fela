# fela-plugin-custom-property

Sometimes it's handy to define some custom properties mostly used as shortcuts.

A custom property basically is just a plain function that takes a value as input and outputs an object of style declarations.

Let's say we want to have a custom property `size` that accepts a single number which will then be transformed into both `width` and `height` with a `px` unit applied.

```javascript
const size = size => ({
  width: size + 'px',
  height: size + 'px'
})
```

Using this custom property e.g.
```javascript
{
  size: 25
}
```
would be transformed into:
```javascript
{
  width: '25px',
  height: '25px'
}
```

### Configuration
In order to get custom properties resolved, you need to configure the plugin with all custom properties once.
```javascript
import customProperty from 'fela-plugin-custom-property'

const sizeProperty = size => ({
  width: size + 'px',
  height: size + 'px'
})

const plugin = customProperty({
  // the key defines the used CSS property
  // the value references the resolving function
  size: sizeProperty
})
```
