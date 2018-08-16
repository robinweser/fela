# createComponent

> **Deprecated**: The createComponent-API is deprecated and will be remove with the next major update.<br>In order to provide a minimal, robust and performant API, we are moving everything over to render-props APIs. See [FelaComponent](FelaComponent.md) and [FelaTheme](FelaTheme.md).

A HoC ([Higher-order Component](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.njbld18x8)) that creates a presentational React component using the rendered `rule` as className.

It automatically composes rules and passed props for nested Fela components.

## Arguments
| Argument | Type | Default | Description |
| --- | --- | --- | --- |
| rule | *Function* |  | A function which satisfies the [rule](../basics/Rules.md) behavior. It **must** return a valid [style object](../basics/Rules.md#styleobject) |
| type | *string?*<br>*[Component](https://facebook.github.io/react/docs/top-level-api.html#react.component)?* | `div` | Component or HTML element which is used as the render base element.<br>**Note**: If a Component is passed, then it receives a className property. |
| passThroughProps | *Array?*<br>*Function?* | | A list of props that get passed to the underlying element.<br>Alternatively a function of `props` that returns an array of prop names. |

## Returns
(*Function*): Stateless functional component.

## Imports
```javascript
import { createComponent } from 'react-fela'
import { createComponent } from 'preact-fela'
import  { createComponent } from 'inferno-fela'
```

## Example
```javascript
const title = ({ small, fontSize, color }) => ({
  lineHeight: small ? 1.2 : 1.5,
  fontSize: fontSize + 'px',
  color: color
})

const Title = createComponent(title, 'div', [ 'onClick' ])

<Title fontSize={23} color="red" onClick={...}>Hello World</Title>
// <div className="a b c" onclick="...">Hello World</div>
```

## Passing Props
Using the `passThroughProps` parameter allows us to pass props to the underlying DOM element. This is helpful if you want to pass e.g. events such as `onClick`. There are some props that are automatically passed and thus do not need to be specified explicitly:

* `className`
* `style`
* `id`

If passing a className, it will automatically be concatenated with the Fela generated className. This allows composing multiple Fela Components.

#### Functional passThroughProps
You may also pass a function of `props` as `passThroughProps`. It must return an array of prop names. e.g. to pass all props you can do:
```javascript
const Title = createComponent(title, 'div', props => Object.keys(props))

// shorthand
const Title = createComponent(title, 'div', Object.keys)
```

> **Note**: The same can be achieved via [createComponentWithProxy](https://github.com/rofrischmann/fela/blob/master/packages/react-fela/docs/createComponentWithProxy.md#createcomponentwithproxyrule-type-passthroughprops).

#### Dynamically passing Props
This use case is especially important for library owners. Instead of passing the `passThroughProps` to the `createComponent` call directly, one can also use the `passThrough` prop on the created component to achieve the same effect.

```javascript
const title = () => ({
  color: 'red'
})

const Title = createComponent(title)

<Title onClick={...} passThrough={[ 'onClick' ]}>Hello World</Title>,
// => <div className="a" onclick="...">Hello World</div>
```

#### Extending Styles
It's possible to extend component styles with an `extend` prop that can be either an object or a function.

```javascript
const title = () => ({
  color: 'red'
})

const Title = createComponent(title)

<Title extend={{ color: 'blue' }}>Hello World</Title>,
// => <div className="a">Hello World</div>
// => .a { color: blue }

const extendTitle = props => ({
  color: props.color
})

<Title extend={extendTitle} color="green">Hello World</Title>,
// => <div className="a">Hello World</div>
// => .a { color: green }
```

## Custom Type on Runtime
To change the `type` on runtime and/or for each component, you may use the `as` prop.
```javascript
const title = props => ({
  color: 'red'
})

const Title = createComponent(title)

<Title as="h1">Hello World</Title>,
// => <h1 className="a">Hello World</h1>
```

## Related

- [Recipe - Explicit Component displayName](../../recipes/DisplayNameComponents.md)
- [API Reference - `createComponentWithProxy`](createComponentWithProxy.md)
