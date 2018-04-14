
# `mapValueToMediaQuery(queryValueMap, mapper)`
Transforms a set of mediaQuery-value pairs into valid style object media queries.

## Arguments
1. `queryValueMap` (*Object*): An object consisting of mediaQuery-value pairs.
2. `mapper` (*Function*): A function that takes each value and returns a style object which is mapped to the media query.

## Returns
(*Object*): An object containing only valid media queries.

## Example
```javascript
import { mapValueToMediaQuery } from 'fela-tools'

const rule = props => ({
  color: 'red',
  fontSize: '15px',
  ...mapValueToMediaQuery(
    props.sizes,
    value => ({ fontSize: value + 'px' })
  )
})

const mediaSizes = {
  '@media (min-width: 320px)': 17,
  '@media (min-width: 480px)': 20
}
const style = rule({ sizes: mediaSizes })

style === {
  color: 'red',
  fontSize: '15px',
  '@media (min-width: 320px)': {
    fontSize: '17px'
  },
  '@media (min-width: 480px)': {
    fontSize: '20px'
  },
}
```

## Tips & Tricks
It is best used within the `extend` value provided by [fela-plugin-extend](../../fela-plugin-extend), because it merges nested objects (such as media queries) instead of overwriting them.

It can also be combined with the [fela-plugin-named-media-query](../../fela-plugin-named-media-query) to have short query keys.
