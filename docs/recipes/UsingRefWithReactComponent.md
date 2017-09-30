# Using ref with React Component

Passing `ref` to Fela components will give a ref to the Fela
wrapper, not to DOM node. So it's not possible to call DOM methods, like focus
on that wrapper. To get a `ref` to wrapped DOM node, pass `innerRef` prop.

```javascript
const rules = () => ({ color: 'red' })
const StyledInput = createComponent(rules, 'input')

class Form extends Component {
  componentDidMount() {
    this.input.focus()
  }

  render() {
    return (
      <StyledInput innerRef={ref => { this.input = ref }} />
    )
  }
}
```
