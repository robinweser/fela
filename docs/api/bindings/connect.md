# connect

A HoC ([Higher-order Component](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.njbld18x8)) that provides the ability to map rendered classes to the component's props using the `styles` key. It is especially useful if we want to style a huge tree of primitive DOM elements e.g. doing basic layouting.

## Arguments

| Argument | Type | Description |
| --- | --- | --- |
| rules | *Object*<br>*Function* | An object containing named rules or a function that produces such an object based on the props of a component. |

## Returns
(*Function*): Component connector that passes the `styles` object to a component.

## Imports
```javascript
import { connect } from 'react-fela'
import { connect } from 'preact-fela'
import { connect } from 'inferno-fela'
```

## Example
```javascript
const Header = ({ title, styles }) => (
  <header className={styles.container}>
    <h1 className={styles.text}>{title}</h1>
  </header>
)

const container = props => ({
  textAlign: 'center',
  padding: '20px',
  height: '200px'
})

const text = props => ({
  lineHeight: 1.2,
  fontSize: props.size,
  color: props.color
})

const ConnectedHeader = connect({
  container,
  text
})(Header)

// Usage
<ConnectedHeader 
  title="Hello World"
  color="red" 
  size="17px" />
```

#### Using a Function of Props 

```javascript
const Header = ({ title, styles }) => (
  <header className={styles.container}>
    <h1 className={styles.text}>{title}</h1>
  </header>
)

const rules = ({ size, color }) => ({
  container: { 
    textAlign: 'center',
    padding: '20px',
    height: '200px'
  },
  text: {   
    lineHeight: 1.2,
    fontSize: size,
    color: color 
  }
})

const ConnectedHeader = connect(rules)(Header)

// Usage
<ConnectedHeader 
  title="Hello World"
  color="red" 
  size="17px" />
```

## Extending Styles
To extend the styles that are injected through the `connect`, there are several ways.

#### Extend Property
It's possible to extend component styles with an `extend` prop that can be either an object or a function.

```javascript
const Header = ({ title, styles }) => (
  <header className={styles.container}>
    <h1 className={styles.text}>{title}</h1>
  </header>
)

const rules = ({ size, color }) => ({
  container: { 
    textAlign: 'center',
    padding: '20px',
    height: '200px'
  },
  text: {   
    lineHeight: 1.2,
    fontSize: size,
    color: color 
  }
})

const ConnectedHeader = connect(rules)(Component)

const extend = ({ bgColor }) => ({
  container: {
    backgroundColor: bgColor,
    padding: '30px'
  },
  text: {
    fontWeight: 700
  }
})

// Usage
<ConnectedHeader 
  title="Hello World"
  size="17px" 
  color="red" 
  bgColor="blue" 
  extend={extend} />
```

#### Reconnection Pattern

Instead of directly passing an `extend` object, one can also use the reconnection pattern to achieve the same effect.

```javascript
const Header = ({ title, styles }) => (
  <header className={styles.container}>
    <h1 className={styles.text}>{title}</h1>
  </header>
)

const rules = ({ size, color }) => ({
  container: { 
    textAlign: 'center',
    padding: '20px',
    height: '200px'
  },
  text: {   
    lineHeight: 1.2,
    fontSize: size,
    color: color 
  }
})

const ConnectedHeader = connect(rules)(Component)

const extend = ({ bgColor }) => ({
  container: {
    backgroundColor: bgColor,
    padding: '30px'
  },
  text: {
    fontWeight: 700
  }
})

const ExtendedHeader = connect(extend)(ConnectedHeader)

// Usage
<ExtendedHeader 
  title="Hello World" 
  size="17px" 
  color="red" 
  bgColor="blue" />
```

## Proxying and Rules Property
If you want to proxy the rules for child components, you can use the `rules` property on inside the component. This is also convenient when you do not want to inline the styles that you plan to use for the extension.

```javascript
const Header = ({ title, styles }) => (
  <header className={styles.container}>
    <h1 className={styles.text}>{title}</h1>
  </header>
)

const rules = ({ size, color }) => ({
  container: { 
    textAlign: 'center',
    padding: '20px',
    height: '200px'
  },
  text: {   
    lineHeight: 1.2,
    fontSize: size,
    color: color 
  }
})

const ConnectedHeader = connect(rules)(Header)

const extend = ({ bgColor }) => ({
  container: {
    backgroundColor: bgColor,
    padding: '30px'
  },
  text: {
    fontWeight: 700
  }
})

const HeaderProxy = ({ rules }) => (
  <ConnectedHeader size="17px" extend={rules} />
)

const ExtendedHeader = connect(extend)(HeaderProxy)

// Usage
<ExtendedHeader 
  title="Hello World"
  color="red" 
  bgColor="blue" />
```
The injected `rules` property is the resulting multi-rule, which was also used to resolve the `styles` object. It is injected in order to give the parent component the ability to control the styling of the child components on the basis of its own style.
