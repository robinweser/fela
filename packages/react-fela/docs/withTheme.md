# `withTheme(component)`

Passes the local theme to the `component` via props. Therefore, any enhanced component must, at some point, be wrapped with a [`<ThemeProvider>`](ThemeProvider.md) component.

It will automatically be updated if the theme changes, even if the parent implements `shouldComponentUpdate` validating falsy or not.


## Arguments
1. ([Component](https://facebook.github.io/react/docs/top-level-api.html#react.component)): A valid React component.

## Example
```javascript
import React from 'react'
import { ThemeProvider, withTheme } from 'react-fela'

const Component = ({ theme }) => (
  <div>The primary color is {theme.primary}</div>
)

// gets access to theme object via prop
const ComponentWithTheme = withTheme(Component)

const RenderTreeFragment = (
  <ThemeProvider theme={{ primary: 'red' }}>
    <ComponentWithTheme />
  </ThemeProvider>
)

// => <div>The primary color is red</div>
```
## Tip

> If components were accessing theme object directly via context before, this would not be possible since 6.0 release. You would have to wrap the component with *withTheme* Hoc and access the theme via props.

> Another way to access theme inside a custom component would be to pass in the component to createComponent and access theme object via props.