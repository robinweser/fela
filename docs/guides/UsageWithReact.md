# Usage with React

Fela was always designed with React in mind, but is **not** bound to React by default. If you want to use it with React, you should also install the official [React bindings for Fela](https://github.com/rofrischmann/react-fela).

```sh
npm -i --save react-fela
```
## Presentational Components
While not required, we highly recommend to split your components into [presentational and container components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.67qfcbme5).
While container components manage the application logic, presentational components should only describe how your application looks like. They get data passed as `props` and return some static HTML markup.<br>
**If we strictly separate our components, we actually only use Fela for presentational components.**
<br>

## Passing the Renderer
We like to avoid using a global Fela renderer which is why the React bindings ship the [`<Provider>`](https://github.com/rofrischmann/react-fela/blob/master/docs/api/Provider.md) component. It takes our renderer and uses React's [context](https://facebook.github.io/react/docs/context.html) to pass it down the whole component tree.<br>
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

// Usage example
<Header title='Hello' color='red' size={17} />
```

Yet it is does not really look convincing as we always have to add the `contextTypes`, mix the rendering process with our markup and always have to use the `context` parameter.<br>
Therefore we also provide the `connect` HoC ([Higher-order Component](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.njbld18x8)). It is used to map rendered classNames to the components `props` directly.

### Example
```javascript
import React from 'react'
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

// Usage example
<Header title='Hello' color='red' size={17} />
```
