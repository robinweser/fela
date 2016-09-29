# Usage with React Native

Fela is designed to be very modular and abstract. The renderer is the only platform specific component. With version 2.0.0 a new native renderer has been added which adds support for React Native. It can be used together with the existing  official [React bindings for Fela](https://github.com/rofrischmann/react-fela).

```sh
npm i --save fela-native react-fela
```

Using Fela with React Native basically works the same as using with React itself. Therefore I really recommend using the [presentational and container components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.67qfcbme5) approach which is already described in [Usage with React](UsageWithReact.md) section.

## Native Renderer
As mentioned above, the only difference to Fela for Web is the renderer itself. It is directly imported from the `fela-native` package.

```javascript
import { createRenderer } from 'fela-native'
```

> **Note**: Other APIs such as `combineRules` and `enhance` are still imported from `fela` directly. The `fela-native` package **only** ships the `createRenderer` method.

We can use the `<Provider>` Component shipped with `react-fela` to pass the renderer via `context`.

```javascript
import React from 'react'
import { AppRegistry } from 'react-native'
import { createRenderer } from 'fela-native'
import { Provider } from 'react-fela'
import App from './App'

const renderer = createRenderer()

const wrappedApp = props => (
  <Provider renderer={renderer}>
    <App />
  </Provider>
)

AppRegistry.registerComponent('FelaNative', () => wrappedApp)
```

## Rendering Styles
Only using the `<Provider>` we actually got everything ready to fully use Fela within our presentational components. We can just use the renderer passed via `context`.

```javascript
import React, { PropTypes } from 'react'
import { View } from 'react-native'

const container = props => ({
  color: props.color,
  padding: 20,
  height: 200
})


const ColoredText = ({ title, size, color }, { renderer }) => {
  const containerStyle = renderer.renderRule(container, { color: color })

  return (
    <View style={containerStyle}>
      I am {props.color}
    </View>
  )
}

ColoredText.contextTypes = { renderer: PropTypes.object }

// Usage example
<ColoredText color='red' />
```

## Advanced Usage
After passing the native renderer, we can use Fela and the React bindings just as shown within the [Usage with React](UsageWithReact.md) section.

#### Plugins & Enhancers
The native renderer also supports plugins, though most plugins do not work with React Native and/or are not necessary for native development as they are web specific e.g. vendor prefixing.<br>
The following plugins and enhancers will also work with React Native:

* [fela-plugin-custom-property](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-custom-property)
* [fela-plugin-extend](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-extend)
* [fela-plugin-remove-undefined](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-remove-undefined)
* [fela-plugin-logger](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-logger)
* [fela-perf](https://github.com/rofrischmann/fela/tree/master/packages/fela-perf)

## Differences
Below there are some key differences comparing Fela for React and Fela for React Native.

* Use `style` not `className`
* `createComponent` always requires the second parameter
* Length values do **not** have units
* Only supported style properties are possible *(It's not CSS!)*
