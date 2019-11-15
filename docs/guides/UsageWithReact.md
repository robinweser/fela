# Usage with React

Fela was always designed with React in mind, but is **not** bound to React by default. If you want to use it with React, you should also install the official [React bindings for Fela](https://github.com/robinweser/fela/tree/master/packages/react-fela).

```sh
# yarn
yarn add react-fela

# npm
npm i --save react-fela
```

## Styling Components
In order to create styled presentational components, react-fela provides the [FelaComponent](../api/bindings/FelaComponent.md) component that uses the render-props pattern.

It accepts a single property *style* that accepts a style object, style function or array of both.

```javascript
import { FelaComponent } from 'react-fela'

const style = {
  padding: '25px',
  backgroundColor: 'rgb(124, 114, 231)',
  fontSize: '20px'
}

// <div class="a b c">Padding everywhere</div>
<FelaComponent style={style}>
  Padding everywhere
</FelaComponent>
```

<img src='../res/react-1.png'>

### Custom Element
FelaComponent renders a *div* by default, but we can pass an **as** prop to configure the rendered element.<br>
It only accepts primitive string elements representing HTML elements. For custom rendering check [render function](#render-function) below.

```javascript
// <span class="a b c">Padding everywhere</span>
<FelaComponent style={style} as="span">
  Padding everywhere
</FelaComponent>
```

### Render Function
Rather than passing a string primitive child, we most likely want to render custom children. We can do that by passing a function that receives an object interface containing **className**, **theme** and **as**.<br>
This is useful if we want to pass additional props to the rendered element.

```javascript
// <p class="a b c" id="some_id">Padding everywhere</p>
<FelaComponent style={style}>
  {({ className }) => (
    <p className={className} id="some_id">
      Padding everywhere
    </p>
  )}
</FelaComponent>
```

### Style as a Function of State
Passing a style object is fine for most cases, because we already know the context in which the component is rendered, thus we probably know most dynamic values.<br>
But what if we want to access the theme or compose styles based on the passed props?<br>
We can do that by passing a function. By spreading all props to the FelaComponent, we make sure that all props are passed to the style function respectively.

```javascript
const style = ({ fontSize = 30 }) => ({
  padding: 20,
  fontWeight: 700,
  fontSize,
})

const Header = props => (
  <FelaComponent style={style} as="h1" {...props} />
)

// <h1 class="a b c">Default Header</h1>
<Header>Default Header</Header>

// <h1 class="a b d">Bigger Header</h1>
<Header fontSize={40}>Bigger Header</Header>
```

#### Composition
By leveraging the array-format for style, we can even achieve composition pretty straight-forward.

```javascript
import { createComponent } from 'react-fela'

const title = ({ color }) => ({
  fontSize: '20px',
  color: color
})

const bordered = ({ borderWidth }) => ({
  border: `${borderWidth}px solid green`
})

const Title = ({ style, ...props }) => <FelaComponent style={[title, style]} {...props} as="h1" />
const BorderedTitle = props => <Title style={bordered} {...props} />

// <h1 class="a b c">I am red and bordered</h1>
<BorderedTitle color='red' borderWidth={2}>I am red and bordered</BorderedTitle>
```
<img src='../res/react-3.png'>


## Component Theming
For flexible and yet simple component theming, react-fela ships the  [ThemeProvider](../api/bindings/ThemeProvider.md) component.
It leverages React's [context](https://facebook.github.io/react/docs/context.html) to pass the theme to all child elements.
<br>

As shown in the example above, the theme can be accessed via `props.theme` within your style function.

```javascript
import { FelaComponent, ThemeProvider } from 'react-fela'

const theme = {
  spacing: {
    small: 10,
    medium: 20,
    big: 30
  },
  color: {
    primary: 'red',
    secondary: 'blue'
  }
}

const style = ({ theme }) => ({
  padding: theme.spacing.medium,
  color: theme.color.primary,
  fontWeight: 700
})

// <h1 class="a b c"></h1>
<ThemeProvider theme={theme}>
  <FelaComponent style={style} as="h1">Red Header</FelaComponent>
</ThemeProvider>
```

You may also nest multiple ThemeProvider instances. The **theme** object will then automatically get merged to extend the previous theme. To force overwrite the **theme** (without merging) you may pass a **overwrite** prop.

## Passing the Renderer
In order to avoid using a global Fela renderer, we ship the [Provider](../api/bindings/Provider.md) component. It takes our renderer and uses React's [context](https://facebook.github.io/react/docs/context.html) to pass it down the whole component tree.

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

## Tips & Tricks
#### Presentational Components
While not required, we highly recommend to split your components into [presentational and container components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.67qfcbme5).
Where container components manage the application logic, presentational components should only describe how your application is displayed (markup & styling). They get data passed as `props` and return a representation of your view for those props.
**If we strictly separate our components, we actually only use Fela for presentational components.**



---

### Related
* [react-fela](https://github.com/robinweser/fela/tree/master/packages/react-fela)
* [API Reference - `FelaComponent`](../api/bindings/FelaComponent.md)
* [API Reference - `FelaTheme`](../api/bindings/FelaTheme.md)
* [API Reference - `Provider`](../api/bindings/Provider.md)
* [API Reference - `ThemeProvider`](../api/bindings/ThemeProvider.md)
* [API Reference - `connect`](../api/bindings/connect.md)
* [API Reference - `createComponent`](../api/bindings/createComponent.md)
* [API Reference - `createComponentWithProxy`](../api/bindings/createComponentWithProxy.md)
* [API Reference - `withTheme`](../api/bindings/withTheme.md)
