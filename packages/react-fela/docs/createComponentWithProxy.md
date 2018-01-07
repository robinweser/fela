# `createComponentWithProxy(rule, [type], [passThroughProps])`

Sometimes you need/want to pass all the props the to child element but doesn't know them all except the one you use in your rules. `createComponentWithProxy`allow you to pass all the props to the child by default except the props used in the rules.

## Usage

This can be used in different cases:
- When you don't know exactly all the props you need to pass to the child.
- If you writing a lib on top of fela and need the component to receive props without forcing the user to specify which props.


## Example
```javascript
import { createComponentWithProxy } from 'react-fela'

const title = props => ({
  lineHeight: props['data-foo'] === 'bar' ? 1.2 : 1.5,
  fontSize: props.fontSize + 'px',
  color: props.color
})

const Title = createComponentWithProxy(title, 'div')

const greet = () => alert('Hello World')

ReactDOM.render(
  <Title fontSize={23} color='red' data-foo='bar' onClick={greet}>Hello World</Title>,
  document.getElementById('app')
)
// => <div className="a b c"  onclick="...">Hello World</div>
```

## Tips

Sometimes you need to be able to use a props in your rules and still pass it to the child. That's why `passThroughProp` is still available in `createComponentWithProxy`. Any props pass in the `passThroughProp` will be pass to the child even if you use it in your rules's component.

## Example
```javascript
import { createComponentWithProxy } from 'react-fela'

const title = props => ({
  lineHeight: props['data-foo'] === 'bar' ? 1.2 : 1.5,
  fontSize: props.fontSize + 'px',
  color: props.color
})

const Title = createComponentWithProxy(title, 'div', ['data-foo'])

const greet = () => alert('Hello World')

ReactDOM.render(
  <Title fontSize={23} color='red' data-foo='bar' onClick={greet}>Hello World</Title>,
  document.getElementById('app')
)
// => <div className="a b c"  data-foo="bar" onclick="...">Hello World</div>
```

## Related

- [createComponent documentation](https://github.com/rofrischmann/fela/blob/master/packages/react-fela/docs/createComponent.md)
- [Explicit displayName for React components](http://fela.js.org/docs/recipes/DisplayNameComponents.html)