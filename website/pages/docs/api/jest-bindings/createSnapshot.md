# createSnapshot

Renders Fela components into a string snapshot including both rendered HTML and CSS to achieve predictable component tests.

It formats and optimises the output for maximum readability. 

## Arguments

| Argument | Type | Default | Description |
| --- | --- | --- | --- |
| component | [*Component*](https://facebook.github.io/react/docs/top-level-api.html#react.component) | |  A valid React component that is rendered. |
| theme | *Object?* | `{}` | A theme object that is automatically used for rendering. |
| renderer | [*Renderer?*](../fela/Renderer.md) | `createRenderer()` | A Fela renderer with custom configuration |
| Provider | [*Provider?*](../bindings/Provider.md) | bindings specific Provider | A custom Provider component |
| ThemeProvider | [*ThemeProvider?*](../bindings/ThemeProvider.md) | bindings specific ThemeProvider | A custom ThemeProvider component | 

## Returns
(*string*): Formatted string including CSS and HTML.

## Imports
```javascript
import { createSnapshot } from 'jest-react-fela'
import { createSnapshot } from 'jest-preact-fela'
import { createSnapshot } from 'jest-inferno-fela'
```

## Example
```javascript
describe('Rendering a Fela component', () => {
  it('should render correctly', () => {
    const snapshot = createSnapshot(
      <FelaComponent style={{ color: 'blue', backgroundColor: 'black' }} />
    )

    expect(snapshot).toMatchSnapshot()
  })
})
```
##### Snapshot
```
.a {
  color: blue
}

.b {
  background-color: black
}

<div className=a b />
```

### Using theme

```javascript
describe('Rendering a Fela component', () => {
  it('should render correctly', () => {
    const rule = ({ theme }) => ({
      backgroundColor: theme.primary,
      color: theme.secondary
    })
    
    const theme = { 
      primary: 'blue',
      secondary: 'red'
    }

    const snapshot = createSnapshot(
      <FelaComponent rule={rule} />,
      theme
    )

    expect(snapshot).toMatchSnapshot()
  })
})
```
##### Snapshot
```
.a {
  background-color: blue
}

.b {
  color: red
}

<div className=a b />
```