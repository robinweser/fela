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

## Extending styles
It's possible to extend component styles with an `extend` prop that can be either an object or a function.

### Example
```javascript
import { connect } from 'react-fela'

const rules = props => ({
  rule1: {
    padding: 1,
  },
  rule2: {
    color: props.color,
  },
})

const MyComponent = connect(rules)(({ styles }) => (
  <div>
    <span className={styles.rule1} />
    <span className={styles.rule2} />
  </div>
))

const extend = {
  rule1: {
    padding: 2
  },
  rule2: {
    fontSize: 16
  }
}

<MyComponent extend={extend} />
// => <div>
// =>  <span className="a" />
// =>  <span className="b c" />
// => </div>
// => .a { padding: 2 }
// => .b { color: red }
// => .c { font-size: 16 }
```

To extend the styles, you can also use the `reconnection` design.

### Example
```javascript
const MyComponent = /* some definition */
const MyStyledComponent = connect(rules)(MyComponent)
const MyRestyledComponent = connect(anotherRules)(MyStyledComponent)
```

If you want to proxy the rules for child components, you can use the `rules` property on inside the component. 

### Example
```javascript
const componentRules = props => ({
  rule1: {
    padding: 1,
  },
  rule2: {
    color: props.color,
  },
})

const MyComponent = connect(componentRules)(({ styles }) => (
  <div>
    <span className={styles.rule1} />
    <span className={styles.rule2} />
  </div>
))

const proxyWrapperRules = {
  rule1: () => ({
    padding: 2
  }),
  rule2: () => ({
    fontSize: 16
  })
}

const ProxyWrapper = connect(proxyWrapperRules)(({ rules }) => (
  <div>
    <MyComponent color="red" extend={rules} />
  </div>
))
```
The variable `rules` that is injected inside the component is the resulting multi-rule, 
on the basis of which the property `styles` was formed. 
This property is injected so that the parent component has the ability to control the styling of the child components 
on the basis of its own styles.
The underlying component is eventually passed a normalized `rules` object which looks like this:

```javascript
const rules = (props) => ({
  rule1: (props) => ({/* some props and values */}),
  rule2: (props) => ({/* some props and values */}),
})
```