# createComponent

This migration guide will show how to replace **createComponent** with the new [FelaComponent]() API in version 10.0.0.

It will also cover **createComponentWithProxy**.


## Basic Usage

#### createComponent
```javascript
import { createComponent } from 'react-fela'

const rule = ({ color, theme }) => ({
  backgroundColor: theme.colors.secondary,
  fontSize: 15,
  color
})

export default createComponent(rule)
```

#### FelaComponent
We spread down all the props in order to use them for rule resolution, which **createComponent** does by default.

```javascript
import { FelaComponent } from 'react-fela'

const rule = ({ color, theme }) => ({
  backgroundColor: theme.colors.secondary,
  fontSize: 15,
  color
})

export default ({ children, ...props }) => (
  <FelaComponent {...props} rule={rule}>
    {children}
  </FelaComponent>
)
```

## Type Parameter
#### createComponent
```javascript
import { createComponent } from 'react-fela'

const rule = ({ color, theme }) => ({
  backgroundColor: theme.colors.secondary,
  fontSize: 15,
  color
})

export default createComponent(rule; 'span')
```

#### FelaComponent
```javascript
import { FelaComponent } from 'react-fela'

const rule = ({ color, theme }) => ({
  backgroundColor: theme.colors.secondary,
  fontSize: 15,
  color
})

export default ({ children, ...props }) => (
  <FelaComponent {...props} rule={rule} as="span">
    {children}
  </FelaComponent>
)
```
> **Note**: The `span` is only used when passing a primitive string child. If we pass a render function instead, we can manipulate the type anyways. The `as` prop is passed to the render function as well.

If we want to enforce a specific `type` we can do the following, but keep in mind that the `children` can no longer accept a render function now.

```javascript
export default ({ children, ...props }) => (
  <FelaComponent {...props} rule={rule}>
    {({ className }) => (
      <span className={className}>{children}</span>
  </FelaComponent>
)
```

## Passing Props
tbd.

## Composition
tbd.
