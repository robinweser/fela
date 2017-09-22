# `withTheme(component)`

Passes the local theme to the `component` via props. Therefore, any enhanced component must, at some point, be wrapped with a [`<ThemeProvider>`](ThemeProvider.md) component.

It will automatically be updated if the theme changes, even if the parent implements `shouldComponentUpdate` validating falsy or not.


## Arguments
1. ([Component](https://facebook.github.io/react/docs/top-level-api.html#react.component)): A valid React component.

## Example
```javascript
import React from 'react'
import { ThemeProvider, withTheme } from 'react-fela'

const ComponentWithTheme = ({ theme }) => (
  <div>The primary color is {theme.primary}</div>
)

const RenderTreeFragment = (
  <ThemeProvider theme={{ primary: 'red' }}>
    <ComponentWithTheme />
  </ThemeProvider>
)

// => <div>The primary color is red</div>
```
