# Usage with React

Fela was always designed with React in mind, but is **not** bound to React by default. If you want to use it with React, you should also install the official [React bindings for Fela](https://github.com/rofrischmann/react-fela).

```sh
npm i --save react-fela
```
## Presentational Components
While not required, we highly recommend to split your components into [presentational and container components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.67qfcbme5).
While container components manage the application logic, presentational components should only describe how your application looks. They get data passed as `props` and return a representation of your view for those props.
**If we strictly separate our components, we actually only use Fela for presentational components.**

## Passing the Renderer
We like to avoid using a global Fela renderer which is why the React bindings ship with a  [`<Provider>`](https://github.com/rofrischmann/react-fela/blob/master/docs/api/Provider.md) component. It takes our renderer and uses React's [context](https://facebook.github.io/react/docs/context.html) to pass it down the whole component tree.<br>
It also takes an optional `mountNode` prop which is used to render our final CSS markup into. *(If you use server rendering you do not need to pass a `mountNode`)*.

### Example

```javascript
import { createRenderer } from 'fela'
import { Provider } from 'react-fela'
import { render } from 'react-dom'
import React from 'react'

const renderer = createRenderer()
// The provider will automatically renderer the styles
// into the mountNode on componentWillMount
const mountNode = document.getElementById('stylesheet')

render(
  <Provider renderer={renderer} mountNode={mountNode}>
    <App />
  </Provider>,
  document.getElementById('app')
)
```

## Rendering Styles
Only using the `<Provider>` we actually got everything ready to fully use Fela within our presentational components. We can just use the renderer passed via `context`.

```javascript
import React, { PropTypes } from 'react'

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

const Header = ({ title, size, color }, { renderer }) => {
  const containerClassName = renderer.renderRule(container)
  const titleClassName = renderer.renderRule(title, {
    fontSize: size + 'px',
    color: color
  })

  return (
    <header className={containerClassName}>
      <h1 className={titleClassName}>{title}</h1>
    </header>
  )
}

Header.contextTypes = { renderer: PropTypes.object }

// Usage example
<Header title='Hello' color='red' size={17} />
```

Yet it is does not really look convincing as we always have to add the `contextTypes`, mix the rendering process with our markup and always have to use the `context` parameter.<br>
Therefore we also provide a HoC ([Higher-order Component](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.njbld18x8)) called `connect`. It is used to map the components `props` directly to rendered classNames.

### Example
```javascript
import React from 'react'
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

// We use both the components props and
// the renderer to compose our classNames
const mapStylesToProps = props => renderer => ({
  container: renderer.renderRule(container),
  title: renderer.renderRule(title, {
    fontSize: props.size + 'px',
    color: props.color
  })
})

export default connect(mapStylesToProps)(Header)

// Usage example
<Header title='Hello' color='red' size={17} />
```

## Presentational Components from Fela Rules
An even more convenient way to create your presentational components is from Fela rules directly. react-fela ships with the [`createComponent`](https://github.com/rofrischmann/react-fela/blob/master/docs/createComponent.md) method which helps to achieve that.<br> It takes a single Fela rule and optionally a base component type.

### Example
```javascript
import React from 'react'
import { createComponent } from 'react-fela'

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

const Title = createComponent(title, 'h1')
const Header = createComponent(container, 'header')

// Usage example
<Header>
  <Title color='red' size={17}>
    Hello World
  </Title>
</Header>
```

<br>

---

### Related
* [react-fela](https://github.com/rofrischmann/react-fela)
* [API reference - `Provider` ](https://github.com/rofrischmann/react-fela/blob/master/docs/Provider.md)
* [API reference - `connect` ](https://github.com/rofrischmann/react-fela/blob/master/docs/connect.md)
* [API reference - `createComponent` ](https://github.com/rofrischmann/react-fela/blob/master/docs/createComponent.md)
