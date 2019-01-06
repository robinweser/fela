# useFela

useFela is React [hook](https://reactjs.org/docs/hooks-intro.html) that provides a universal `css` function. It also provides access to both renderer and theme.

## Arguments

| Argument | Type | Default | 
| --- | --- | --- |
| props | *Object* | An object of props that is used to render rules. |

## Returns
(*Object*): The hook interface

## Interface
| Property | Type | Description |
| --- | --- | --- |
| css | *function* | A function that accepts a list of [style object](../basics/Rules.md#styleobject) and/or [rule](../basics/Rules.md) and returns a single className. |
| theme | *Object* | The theme object which is passed down via context |
| renderer | *[Renderer](../../basics/Renderer.md)* | The renderer that is passed down via context |

## Imports
> **Note**: Due to lack of support for hooks, useFela is currently only available for react-fela.
```javascript
import { useFela } from 'react-fela'
```

## Example
```javascript
function RedOnBlue({ children }) {
  const { css } = useFela()

  return (
    <div className={css({ backgroundColor: 'blue', color: 'red' })}>
      {children}
    </div>
  )
}
```

#### Passing props
```javascript
const rule = ({ color }) => ({
  backgroundColor: 'blue',
  color,
})

function RedOnBlue({ children, ...otherProps }) {
  const { css } = useFela(otherProps)

  return (
    <div className={css(rule)}>
      {children}
    </div>
  )
}

// Usage
<RedOnBlue color="red" /> 
```

#### Passing multiple styles
```javascript
function RedOnBlue({ children, customStyle }) {
  const { css } = useFela()

  return (
    <div className={css({ backgroundColor: 'blue', color: 'red' }, customStyle)}>
      {children}
    </div>
  )
}

// Usage
<RedOnBlue customStyle={{ fontSize: 12 }} /> 
```