# `<ThemeProvider>`

The `<ThemeProvider>` component passes a single theme object down to its children. It can be used multiple times to achieve different themes for different parts of the component tree. It uses React's [context](https://facebook.github.io/react/docs/context.html) to pass down the theme.
<br>
Nested themes automatically get combined. This helps if you only want to change or add a single value without repeating the whole theming used before.
<br>
<br>
**The theme gets passed to both `createComponent` and `connect` via props.**

## Props
1. `theme` (*Object*): theme object with any information

## Example
```javascript
import { ThemeProvider } from 'react-fela'
import React from 'react'

const RenderTreeFragment = (
  <ThemeProvider theme={{ color: 'red', fontSize: 15 }}>
    <Text>I am red and 15px sized</Text>
    <ThemeProvider theme={{ color: 'blue' }}>
      <Text>I am blue and 15px sized</Text>
    </ThemeProvider>
    <ThemeProvider theme={{ bgColor: 'yellow' }}>
      <Text>I am red and 15px sized with a yellow background</Text>
    </ThemeProvider>
  </ThemeProvider>
)
```

```javascript
import { createComponent } from 'react-fela'

const rule = props => ({
  fontSize: props.theme.fontSize,
  color: props.theme.color,
  backgroundColor: props.theme.bgColor
})

export default createComponent(rule)
```
