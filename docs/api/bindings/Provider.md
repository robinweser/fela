# `<Provider>`

The `<Provider>` component wraps your whole application. It uses the [context](https://facebook.github.io/react/docs/context.html) feature to pass down the renderer. It actually is all you need to fully use Fela within your application.

## Props
1. `renderer` ([*Renderer*](http://fela.js.org/docs/api/Renderer.html)): Fela renderer which is used to actually render our styles.

## Imports
```javascript
// React
import { Provider } from 'react-fela'

// Preact
import { Provider } from 'preact-fela'

// Inferno
import  { Provider } from 'inferno-fela'
```

## Example
```javascript
import { createRenderer } from 'fela'

const renderer = createRenderer()

// Wrap your root application with the Provider
// to pass down the renderer to every component using context
<Provider renderer={renderer}>
  <App />
</Provider>,
```
All of our components can now directly use the renderer from `context`.

```javascript
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
```
