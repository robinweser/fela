# `createComponent(rule, [type], [passThroughProps])`

This HoC ([Higher-order Component](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.njbld18x8)) creates a presentational React component using the rendered `rule` as className.

It automatically composes rules and passed props for nested Fela components.

## Arguments
1. `rule` (*Function*): A function which satisfies the [rule](../basics/Rules.md) behavior. It **must** return a valid [style object](../basics/Rules.md#styleobject).
2. `type` (*string?|[Component](https://facebook.github.io/react/docs/top-level-api.html#react.component)?*): React Component or HTML element which is used as the render base element. Defaults to `div`. Note: If a Component is passed, then it receives a className property.
3. `passThroughProps` (*Array?|Function?*): A list of props that get passed to the underlying element. Alternatively a function of `props` that returns an array of prop names.

## Returns
(*Function*): Stateless functional React component.

## Example
```javascript
import { createComponent } from 'react-fela'

const title = props => ({
  lineHeight: props['data-foo'] === 'bar' ? 1.2 : 1.5,
  fontSize: props.fontSize + 'px',
  color: props.color
})

const Title = createComponent(title, 'div', [ 'data-foo', 'onClick' ])

const greet = () => alert('Hello World')

ReactDOM.render(
  <Title fontSize={23} color="red" data-foo="bar" onClick={greet}>Hello World</Title>,
  document.getElementById('app')
)
// => <div className="a b c" data-foo="bar" onclick="...">Hello World</div>
```

## Passing props
Using the `passThroughProps` parameter allows us to pass props to the underlying DOM element. This is helpful if you want to pass e.g. events such as `onClick`. There are some props that are automatically passed and thus do not need to be specified explicitly:

* `className`
* `style`
* `id`

If passing a className, it will automatically be concatenated with the Fela generated className. This allows composing multiple Fela Components.

#### Functional passThroughProps
You may also pass a function of `props` as `passThroughProps`. It must return an array of prop names. e.g. to pass all props you can do:
```javascript
const Title = createComponent(title, 'div', props => Object.keys(props))
```

Note: The same can be achieved via [createComponentWithProxy](https://github.com/rofrischmann/fela/blob/master/packages/react-fela/docs/createComponentWithProxy.md#createcomponentwithproxyrule-type-passthroughprops) and is recommended.

#### Dynamically passing props
This use case is especially important for library owners. Instead of passing the `passThroughProps` to the `createComponent` call directly, one can also use the `passThrough` prop on the created component to achieve the same effect.

##### Example
```javascript
import { createComponent } from 'react-fela'

const title = () => ({
  color: 'red'
})

const Title = createComponent(title)

const greet = () => alert('Hello World')

ReactDOM.render(
  <Title onClick={greet} passThrough={[ 'onClick' ]}>Hello World</Title>,
  document.getElementById('app')
)
// => <div className="a" onclick="...">Hello World</div>
```

#### Extending styles
It's possible to extend component styles with an `extend` prop that can be either an object or a function.

##### Example
```javascript
import { createComponent } from 'react-fela'

const title = () => ({
  color: 'red'
})

const Title = createComponent(title)

ReactDOM.render(
  <Title extend={{ color: 'blue' }}>Hello World</Title>,
  document.getElementById('app')
)
// => <div className="a">Hello World</div>
// => .a { color: blue }

const extendTitle = props => ({
  color: props.color
})

ReactDOM.render(
  <Title extend={extendTitle} color="green">Hello World</Title>,
  document.getElementById('app2')
)
// => <div className="a">Hello World</div>
// => .a { color: green }
```

## Custom type on runtime
To change the `type` on runtime and/or for each component, you may use the `as` prop.
```javascript
import { createComponent } from 'react-fela'

const title = props => ({
  color: 'red'
})

const Title = createComponent(title)

ReactDOM.render(
  <Title as="h1">Hello World</Title>,
  document.getElementById('app')
)
// => <h1 className="a">Hello World</h1>
```

## Related

- [createComponentWithProxy](https://github.com/rofrischmann/fela/blob/master/packages/react-fela/docs/createComponentWithProxy.md#createcomponentwithproxyrule-type-passthroughprops)
- [Explicit displayName for React components](http://fela.js.org/docs/recipes/DisplayNameComponents.html)
