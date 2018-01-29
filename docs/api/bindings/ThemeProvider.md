# `<ThemeProvider>`

The `<ThemeProvider>` component passes a single theme object down to its children. It can be used multiple times to achieve different themes for different parts of the component tree. It uses the [context](https://facebook.github.io/react/docs/context.html) feature to pass down the theme.
<br>
Nested themes automatically get combined if not explicitly prevented. This helps if you only want to change or add a single value without repeating the whole theming used before.
<br>
<br>
**The theme gets passed to both `createComponent` and `connect` via props.**

## Props
1. `theme` (*Object*): theme object with any information
3. `overwrite` (*boolean*): overwrite all previous theme properties

## Imports
```javascript
// React
import { ThemeProvider } from 'react-fela'

// Preact
import { ThemeProvider } from 'preact-fela'

// Inferno
import  { ThemeProvider } from 'inferno-fela'
```

## Example
```javascript
import React from 'react'

const text = ({ theme }) => ({
  backgroundColor: theme.bgColor,
  fontSize: theme.fontSize,
  color: theme.color
})

const Text = createComponent(text)

<ThemeProvider theme={{ color: 'red', fontSize: 15 }}>
  <Text>I am red and 15px sized</Text>
  <ThemeProvider theme={{ color: 'blue' }}>
    <Text>I am blue and 15px sized</Text>
  </ThemeProvider>
  <ThemeProvider theme={{ bgColor: 'yellow' }}>
    <Text>I am red and 15px sized with a yellow background</Text>
  </ThemeProvider>
</ThemeProvider>
```

#### Overwriting themes
The `overwrite` options help to prevent theme inheritance for nested `<ThemeProvider>` instances.

```javascript
const text = ({ theme }) => ({
  fontSiz: theme.fontSize,
  color: theme.color || 'red'
})

const Text = createComponent(text)


<ThemeProvider theme={{ color: 'blue', fontSize: 15 }}>
  <Text>I am blue and 15px sized</Text>
  <ThemeProvider overwrite theme={{ fontSize: 20 }}>
    <Text>I am red and 20px sized</Text>
  </ThemeProvider>
</ThemeProvider>
```
