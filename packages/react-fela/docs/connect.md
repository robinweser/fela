# `connect(rules)`

This HoCs ([Higher-order Components](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.njbld18x8)) provides the ability to map rendered classNames to a components `props` directly.<br>
It provides all classNames using the `styles` prop.

## Arguments
1. `rules` (*Object*): An object containing named rules which are provided to the component.

## Returns
(*Function*): Component connector that passes the classNames to a React component.

## Example
```javascript
import { connect } from 'react-fela'

const Header = ({ title, styles }) => (
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

const Connectedheader = connect({
  container,
  title
})(Header)

ReactDOM.render(
  <Connectedheader
    title='Hello World'
    color='red'
    size={17} />,
  document.getElementById('app')
)
```
