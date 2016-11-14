# `connect(mapStylesToProps)`

This HoCs ([Higher-order Components](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.njbld18x8)) provides the ability to map rendered classNames to a components `props` directly.<br>
It provides all classNames using the `styles` prop.

## Arguments
1. `mapStylesToProps` (*Function*): A function
of `props` that returns a function of `renderer` which again returns an object of rendered classNames. The signature is: `props => renderer => ({ /* classNames */ })`.

## Returns
(*Function*): Component connector that passes the classNames to a React component.

## Example
```javascript
import { connect } from 'react-fela'

let Header = ({ title, styles }) => (
  <header className={styles.container}>
    <h1 className={styles.title}>{title}</h1>
  </header>
)

const container = props => ({
  textAlign: 'center',
  padding: '20px',
  height: '200px'
})

const title = props => ({
  lineHeight: 1.2,
  fontSize: props.fontSize,
  color: props.color
})

// We use both the components props and
// the renderer to compose our classNames
const mapStylesToProps = props => renderer => ({
  container: renderer.renderRule(container),
  title: renderer.renderRule(title, {
    fontSize: props.size + 'px',
    color: props.color
  })
})

Header = connect(mapStylesToProps)(Header)

ReactDOM.render(
  <Header
    title='Hello World'
    color='red'
    size={17} />,
  document.getElementById('app')
)
```
