# Hot Reloading

Right now there is no built-in solution for hot reloading by default.
But with the following pattern, one can enable HMR.

> Tip: Check how [este](https://github.com/este/este/blob/c7e1138e51be6a8c27ba534dc8ecd0c74a695a57/src/browser/app/Root.js#L13) is doing it!

The following example uses the [React bindings for Fela](https://github.com/rofrischmann/fela/tree/master/packages/react-fela).

```javascript
import { Provider } from 'react-fela'
import { createRenderer } from 'fela'

function getNextMountNode() {
  const mountNode = document.getElementById('stylesheet')
  const parentNode = mountNode.parentNode

  const nextMountNode = document.createElement('style')
  nextMountNode.id = 'stylesheet'

  parentNode.replaceChild(nextMountNode, mountNode)
  return nextMountNode
}

const renderer = createRenderer()

const App = (
  <Provider mountNode={getNextMountNode())} renderer={renderer}>
    // your app code here
  </Provider>
)
```
