# Usage with Inferno

Inferno is a modern React-like UI library which ships an almost identical API, but claims to be much faster.
Due to the fact it is really similar to React's API, the [Inferno bindings for Fela](https://github.com/rofrischmann/inferno-fela) are basically the same as the [React bindings for Fela](https://github.com/rofrischmann/react-fela).

```sh
npm i --save inferno-fela
```

Instead of providing duplicate documentation, we therefore want you to check out the [Usage with React](UsageWithReact.md) instead. Just "replace" React with Inferno and you should be fine. There are only some differences which we are listing below.

### Separate packages

Instead of providing the whole isomorphic API as a single package (like React does), Inferno has separate packages.

##### `Component`
```javascript
import { Component } from 'react'
import Component from 'inferno-component'
```

##### `createElement`
```javascript
import { createElement } from 'react'
import createElement from 'inferno-create-element'
```

##### `renderToString`
```javascript
import { renderToString } from 'react-dom/server'
import { renderToString } from 'inferno-server'
```


<br>

---

### Related
* [inferno-fela](https://github.com/rofrischmann/inferno-fela)
