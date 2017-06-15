# `<Provider>`

The `<Provider>` component wraps your whole application. It uses React's [context](https://facebook.github.io/react/docs/context.html) to pass down the renderer. It actually is all you need to fully use Fela within your React application.

## Props
1. `renderer` ([*Renderer*](http://fela.js.org/docs/api/Renderer.html)): Fela renderer which is used to actually render our styles.
2. `mountNode` (*DOMNode*): An optional DOMNode where the renderer will write its rules. If not provided, the renderer will create one on its own. Providing the renderer with a mountNode can be useful to be sure that the create rules are written in the DOM after (or before) an other stylesheet.

## Example
```javascript
import { createRenderer } from 'fela'
import { Provider } from 'react-fela'
import { render } from 'react-dom'
import React from 'react'

const renderer = createRenderer()

render(
  <Provider renderer={renderer}>
    <App />
  </Provider>,
  document.getElementById('app')
)
```
All of our components can now directly use the renderer from `context`.

```javascript
import React, { PropTypes } from 'react'

const rule = props => ({
  fontSize: '12px',
  fontWeight: 300,
  color: props.color,
  padding: '10px'
})

const App = (props, { renderer }) => {
  const className = renderer.renderRule(rule, { color: 'blue' })

  return (
    <div className={className}>
      I am blue. (Da ba dee da ba di)
    </div>
  )
}

App.contextTypes = { renderer: PropTypes.object }
export default App
```

With a `mountNode`.
```javascript
import { createRenderer } from 'fela'
import { Provider } from 'react-fela'
import { render } from 'react-dom'
import React from 'react'

const renderer = createRenderer()

render(
  <Provider renderer={renderer} mountNode={document.getElementById('stylesheet')}>
    <App />
  </Provider>,
  document.getElementById('app')
)
```
