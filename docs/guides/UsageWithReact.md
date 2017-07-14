# Usage with React

Fela was always designed with React in mind, but is **not** bound to React by default. If you want to use it with React, you should also install the official [React bindings for Fela](https://github.com/rofrischmann/fela/tree/master/packages/react-fela).

```sh
npm i --save react-fela
```

## Presentational Components
While not required, we highly recommend to split your components into [presentational and container components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.67qfcbme5).
Where container components manage the application logic, presentational components should only describe how your application is displayed (markup & styling). They get data passed as `props` and return a representation of your view for those props.
**If we strictly separate our components, we actually only use Fela for presentational components.**

### Presentational Components from Rules
From the very beginning, react-fela ships the [`createComponent`](https://github.com/rofrischmann/fela/tree/master/packages/react-fela/docs/createComponent.md) API. It basically creates primitive React components using the passed rule to style it. This works as easy as e.g. [styled-components](https://github.com/styled-components/styled-components).

```javascript
import { createComponent } from 'react-fela'

const container = ({ padding }) => ({
  padding: padding + 'px',
  backgroundColor: 'rgb(124, 114, 231)',
  fontSize: '20px'
})

const Container = createComponent(container)

// <div class="a b c">Padding everywhere</div>
<Container padding={20}>Padding everywhere</Container>
```

<img src='../res/react-1.png'>


#### Custom element/component
`createComponent` renders into a `div` by default, but is also able to render into any other HTML element or React component.<br>
Simply pass either a string (HTML element) or function/class (React component) as a second argument.

```javascript
import { createComponent } from 'react-fela'

const title = ({ fontSize, color }) => ({
  fontSize: fontSize + 'px',
  color: color
})

const Title = createComponent(title, 'h1')

// <h1 class="a b">I am red</h1>
<Title fontSize={20} color="red">I am red</Title>
```
<img src='../res/react-2.png'>

#### Composition
It also supports automatic style composition for multiple composed Fela components.

```javascript
import { createComponent } from 'react-fela'

const title = ({ color }) => ({
  fontSize: '20px',
  color: color
})

const bordered = ({ borderWidth }) => ({
  border: `${borderWidth}px solid green`
})

const Title = createComponent(title, 'h1')
const BorderedTitle = createComponent(bordered, Title)

// <h1 class="a b c">I am red and bordered</h1>
<BorderedTitle color='red' borderWidth={2}>I am red and bordered</BorderedTitle>
```
<img src='../res/react-3.png'>

For advanced API documentation, please check out the [`createComponent`](https://github.com/rofrischmann/fela/tree/master/packages/react-fela/docs/createComponent.md) API docs.<br>
Amongst other things, you can learn how to pass props to the underlying element.


## Component Theming
For flexible and yet simple component theming, react-fela ships the  [`<ThemeProvider>`](https://github.com/rofrischmann/fela/tree/master/packages/react-fela/docs/ThemeProvider.md) component.
It leverages React's context to pass the theme to all child elements.
<br>

The theme can then be accessed via `props.theme` within `createComponent`.

```javascript
import { createComponent, ThemeProvider } from 'react-fela'


const theme = {
  fontColor: 'green',
  fontSize: '30px'
}

const title = props => ({
  fontSize: props.theme.fontSize,
  color: props.theme.fontColor
})

const Title = createComponent(title, 'h1')

// <h1 class="a b"></h1>
<ThemeProvider theme={theme}>
  <Title>I am green and big</Title>
</ThemeProvider>
```
<img src='../res/react-4.png'>

You may also nest multiple `<ThemeProvider>`. The `theme` object will then automatically get merged to extend the previous theme. To force overwrite the `theme` (without merging) you may pass a `overwrite` prop.


## Passing the Renderer
We like to avoid using a global Fela renderer which is why the React bindings ship with a  [`<Provider>`](https://github.com/rofrischmann/fela/tree/master/packages/react-fela/docs/api/fela/Provider.md) component. It takes our renderer and uses React's [context](https://facebook.github.io/react/docs/context.html) to pass it down the whole component tree.
```javascript
import { createRenderer } from 'fela'
import { Provider } from 'react-fela'
import { render } from 'react-dom'
import React from 'react'

const renderer = createRenderer()

render(
  <Provider renderer={renderer}>
    <App />
  </Provider>,
  document.getElementById('app')
)
```

---

### Related
* [react-fela](https://github.com/rofrischmann/fela/tree/master/packages/react-fela)
* [API reference - `Provider` ](https://github.com/rofrischmann/fela/tree/master/packages/react-fela/docs/Provider.md)
* [API reference - `connect` ](https://github.com/rofrischmann/fela/tree/master/packages/react-fela/docs/connect.md)
* [API reference - `createComponent` ](https://github.com/rofrischmann/fela/tree/master/packages/react-fela/docs/createComponent.md)
* [API reference - `createComponentWithProxy` ](https://github.com/rofrischmann/fela/tree/master/packages/react-fela/docs/createComponentWithProxy.md)
* [API reference - `ThemeProvider`](https://github.com/rofrischmann/fela/tree/master/packages/react-fela/docs/ThemeProvider.md)
