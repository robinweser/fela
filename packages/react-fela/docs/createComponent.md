# `createComponent(rule, [type], [passThroughProps])`

This HoCs ([Higher-order Components](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.njbld18x8)) creates a presentational React component using the rendered `rule` as className.

## Arguments
1. `rule` (*Function*): A function which satisfies the [rule](../basics/Rules.md) behavior. It **must** return a valid [style object](../basics/Rules.md#styleobject).
2. `type` (*string?|[Component](https://facebook.github.io/react/docs/top-level-api.html#react.component)?*): React Component or HTML element which is used as the render base element. Defaults to `div`.
3. `passThroughProps` (*Object?*): An object where the keys are props which get passed to the underlaying element. The value determines whether the prop gets passed to the `renderRule` call (`true`) or not (`false`).

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

const Title = createComponent(title, 'div', {
  // will also be passed to the fela rule
  'data-foo': true,
  // will only be passed to the component
  onClick: false
})

const greet = () => alert('Hello World')

ReactDOM.render(
  <Title fontSize={23} color='red' data-foo='bar' onClick={greet}>Hello World</Title>,
  document.getElementById('app')
)
// => <div className="c0 c0-xxxx" data-foo="bar" onclick="...">Hello World</div>
```

## Passing props
Using the `passThroughProps` parameter allows us to pass props to the underlying DOM element. This is helpful if you want to pass e.g. events such as `onClick`. There are some props that are automatically passed and thus do not need to be specified explicitly:
* `className`
* `style`

If passing a className, it will automatically be concatenated with the Fela generated className. This allows composing multiple Fela Components.

#### Dynamically passing props
This use case is especially important for library owners. Instead of passing the `passThroughProps` to the `createComponent` call directly, one can also use the `passThrough` prop on the created component to achieve the same effect.

##### Example
```javascript
import { createComponent } from 'react-fela'

const title = props => ({
  color: 'red'
})

const Title = createComponent(title)
})

const greet = () => alert('Hello World')

ReactDOM.render(
  <Title onClick={greet} passThrough={{ 'onClick': false }}>Hello World</Title>,
  document.getElementById('app')
)
// => <div className="c0" onclick="...">Hello World</div>
```
