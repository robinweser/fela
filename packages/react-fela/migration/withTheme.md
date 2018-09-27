# withTheme

This migration guide will show how to replace **withTheme** with the new [FelaTheme]() API in version 10.0.0.

## Basic Example

#### withTheme
```javascript
import { withTheme } from 'react-fela'

const ComponentWithTheme = ({ theme }) => (
  <div>Primary color is {theme.colors.primary}</div>
)

export default withTheme(ComponentWithTheme)
```

#### FelaTheme
```javascript
import { FelaTheme } from 'react-fela'

export default () => (
  <FelaTheme>
    {theme => (
      <div>Primary color is {theme.colors.primary}</div>
    )}
  </FelaTheme>
)
```