# Responsive Components

In modern web projects, responsive design and flexible layout is a common practice.<br>
Still it can be tricky sometimes, especially when trying to use primitive configurable components.

To achieve responsive styling, media queries were introduced, to style elements depending on the device height and width.

## Primitive Approach
Using Fela, a primitive component with e.g. responsive width could look like this:

```javascript
import { createComponent } from 'react-fela'

const Responsive = () => ({
  width: '100%',
  height: '100%',

  '@media (min-width: 768px)': {
    width: 700
  },
  '@media (min-width: 1024px)': {
    width: 1000
  }
})

export default createComponent(Responsive)
```

That's pretty basic, but also not very customizable as everything is hard-coded. So let's take those width values and make them props.

## Dynamic Props

```javascript
const Responsive = ({ defaultWidth, mediumWidth, bigWidth }) => ({
  width: defaultWidth,
  height: '100%',

  '@media (min-width: 768px)': {
    width: mediumWidth
  },
  '@media (min-width: 1024px)': {
    width: bigWidth
  }
})

export default createComponent(Responsive)
```

Now we can create multiple `Responsive` instances with different width values by using the `defaultWidth`, `mediumWidth` and `bigWidth` props. But as you may think, that's still pretty much hard-coded and does not scale well. Especially, because you can not modify the media query values through the props.

## mapValueToMediaQuery
This helper was created to solve the exact same problem which is mentioned above. It is shipped with [fela-tools](https://github.com/rofrischmann/fela/tree/master/packages/fela-tools) (check the [API Reference](https://github.com/rofrischmann/fela/blob/master/packages/fela-tools/docs/mapValueToMediaQuery.md)).
It takes an object with mediaQuery-value pairs and maps them to media queries. Pretty simple, but quite powerful in a declarative component world.

> It is recommended to use it together with [fela-plugin-extend](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-extend) to be able to merge multiple properties with the same media query. Otherwise they'll be overwritten.

The above example could look something like this:

```javascript
import { createComponent } from 'react-fela'
import { mapValueToMediaQuery } from 'fela-tools'

const Responsive = ({ width, widths }) => ({
  height: '100%',
  width,

  extend: [
    mapValueToMediaQuery(widths, value => ({ width: value }))
  ]
})

export default createComponent(Responsive)
```

Now we can use the dynamic `Responsive` component with any media query.

> The `width`, `widths` naming is just a pattern I found useful as I always use a default prop (usually doing mobile-first designs). For more clarity, you might also choose e.g. `width`, `responsiveWidth`.

```javascript
import Responsive from './Responsive'

const widths = {
  '@media (min-width: 768px)': 700,
  '@media (min-width: 1024px)': 1000,
  '@media (min-width: 1440px)': 1400
}

// Usage
<Responsive width='100%' widths={widths} />
```

## Compact markup
We now have a highly dynamic approach to responsive components, but it also really bloats the markup and, especially when inlined, significantly reduces the readability.<br><br>
You may improve that using the [fela-plugin-named-keys](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-named-keys).

It let's us define some global alias for media query strings, which can then be used directly within Fela rules. With the following configuration:

```javascript
const namedKeysPlugin = namedKeys({
  phablet: '@media (min-width: 768px)',
  tablet: '@media (min-width: 1024px)',
  desktop: '@media (min-width: 1440px)'
})
```
We can now write our markup like this:
```javascript
import Responsive from './Responsive'

const widths = {
  phablet: 700,
  tablet: 1000,
  desktop: 1400
}

// Usage
<Responsive width='100%' widths={widths} />
```
