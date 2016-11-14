# `<Provider>`

The `<Provider>` component wraps your whole application. It uses React's [context](https://facebook.github.io/react/docs/context.html) to pass down the renderer. It actually is all you need to fully use Fela within your React application.

## Props
1. `renderer` ([*Renderer*](http://fela.js.org/docs/api/Renderer.html)): Fela renderer which is used to actually render our styles.
2. `mountNode` ([*HTMLElement?*](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)): DOM node to render the CSS into. It uses [`Fela.render(renderer, mountNode)`](http://fela.js.org/docs/api/render.html) on `componentWillMount` to initially connect the DOM node.

## Example
```javascript
import { createRenderer } from 'fela'
import { Provider } from 'react-fela'
import { render } from 'react-dom'
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
All of our components can now directly use the renderer from `context`.

```javascript
import React, { PropTypes } from 'react'

const selector = props => ({
  fontSize: '12px',
  fontWeight: 300,
  color: props.color,
  padding: '10px'
})

const App = (props, { renderer }) => {
  const className = renderer.renderRule(selector, { color: 'blue' })

  return (
    <div className={className}>
      I am blue. (Da ba dee da ba di)
    </div>
  )
}

App.contextTypes = { renderer: PropTypes.object }
export default App
```
