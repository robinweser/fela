# FelaTheme

FelaTheme is an alternative component to the [withTheme](withTheme.md)-HoC leveraging the render-props pattern. It is used to access the theme object that is specified and passed down via [context](https://facebook.github.io/react/docs/context.html) by a [ThemeProvider](ThemeProvider.md).

## Props

| Property | Type | Description |
| --- | --- | --- |
| children | *Function* | A render function that receives the theme object as its first parameter. |


## Imports
```javascript
import { FelaTheme } from 'react-fela'
import { FelaTheme } from 'preact-fela'
import { FelaTheme } from 'inferno-fela'
```

## Example
```javascript
<FelaTheme>
  {theme => (
    <div>Primary color is ${theme.primary}.</div>
  )}
</FelaTheme>
```