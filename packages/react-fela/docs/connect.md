# `connect(rules)`

This HoC ([Higher-order Component](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.njbld18x8)) provides the ability to map rendered classNames to a components `props` directly.<br>
It provides all classNames using the `styles` prop.

## Arguments
1. `rules` (*Object* | *Function*): An object containing named rules which are provided to the component 
or a function that produces such an object based on the properties of a React component.

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
  fontSize: props.size,
  color: props.color
})

const ConnectedHeader = connect({
  container,
  title
})(Header)

ReactDOM.render(
  <ConnectedHeader
    title='Hello World'
    color='red'
    size={17} />,
  document.getElementById('app')
)
```
Another example with a function:
```javascript
import { connect, ThemeProvider } from 'react-fela'

const Header = ({ title, styles }) => (
  <header className={styles.container}>
    <h1 className={styles.title}>{title}</h1>
  </header>
)

const rules = ({ theme }) => {
  const color = theme.colors.primary
    
  return {
    container: { color },
    title: { color }
  }
}

const ConnectedHeader = connect(rules)(Header)

const theme = {
  colors: {
    primary: 'blue'
  }
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ConnectedHeader/>
  </ThemeProvider>,
  document.getElementById('app')
)
```
