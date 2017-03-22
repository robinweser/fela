# Usage with Preact

Like Inferno, Preact is a modern React-like UI library which ships an almost identical API, but claims to be much faster and lightweight.
Due to the fact that it is really similar to React's API, the [Preact bindings for Fela](https://github.com/rofrischmann/preact-fela) are basically the same as the [React bindings for Fela](https://github.com/rofrischmann/fela/tree/master/packages/react-fela).

```sh
npm i --save preact-fela
```

Instead of providing duplicate documentation, we therefore want you to check out the [Usage with React](UsageWithReact.md) instead. Just "replace" React with Preact and you should be fine. There are only some differences which we are listing below.

### Different packages


##### `renderToString`
```javascript
import { renderToString } from 'react-dom/server'
import { renderToString } from 'preact-render-to-string'
```

##### `render`
```javascript
import { render } from 'react-dom'
import { render } from 'preact'
```

---

### Related
* [preact-fela](https://github.com/rofrischmann/fela/tree/master/packages/preact-fela)
* [react-fela](https://github.com/rofrischmann/fela/tree/master/packages/react-fela)
* [inferno-fela](https://github.com/rofrischmann/fela/tree/master/packages/inferno-fela)
