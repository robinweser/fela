# withTheme

> **Deprecated**: The withTheme-API is deprecated and will be remove with the next major update.<br>In order to provide a minimal, robust and performant API, we are moving everything over to render-props APIs. See [FelaComponent](FelaComponent.md) and [FelaTheme](FelaTheme.md).

Injects the theme object, that is passed down using a [ThemeProvider](ThemeProvider.md), into a component's props.
It will automatically rerender the component if the theme changes. This even works if any parent component implements `shouldComponentUpdate`.


## Arguments

| Argument | Type | Default | Description |
| --- | --- | --- | --- |
| component | *[Component](https://facebook.github.io/react/docs/top-level-api.html#react.component)* | |  A valid React component that gets enhanced. |
| propName | *string?* | `theme` | An alternative name that is used to pass the theme. |

## Example
```javascript
const Component = ({ theme }) => (
  <div>The primary color is {theme.primary}</div>
)

const ComponentWithTheme = withTheme(Component)
```

## Tips & Tricks

* If components were accessing theme object directly via context before, this would not be possible since 6.0 release. You would have to wrap the component with *withTheme* Hoc and access the theme via props.

* Another way to access theme inside a custom component would be to pass in the component to createComponent and access theme object via props.