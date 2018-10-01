# Usage with React Native

Fela is designed to be very modular and abstract. The renderer is the only platform specific component. With version 2.0.0 a new native renderer has been added which adds support for React Native. It can be used together with the existing  official [React bindings for Fela](https://github.com/rofrischmann/fela/tree/master/packages/react-fela).

```sh
# yarn
yarn add fela-native react-fela

# npm
npm i --save fela-native react-fela
```

Using Fela with React Native basically works the same as using with React itself. Therefore I really recommend using the [presentational and container components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.67qfcbme5) approach which is already described in [Usage with React](UsageWithReact.md) section.

## Native Renderer
As mentioned above, the only difference to Fela for Web is the renderer itself. It is directly imported from the [fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native) package.

```javascript
import { createRenderer } from 'fela-native'
```

> **Note**: Other APIs such as [combineRules](../api/fela/combineRules.md) and [enhance](../api/bindings/enhance.md) are still imported from [fela](https://github.com/rofrischmann/fela/tree/master/packages/fela) directly. The [fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native)  package **only** ships the [createRenderer](../api/fela/createRenderer.md) method.

We can use the [Provider](../api/bindings/Provider.md) Component shipped with [react-fela](https://github.com/rofrischmann/fela/tree/master/packages/react-fela) to pass the renderer via [context](https://facebook.github.io/react/docs/context.html).

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

* [FelaComponent](../api/bindings/FelaComponent.md) always requires `children` to always be a function that renders to native components(see example below)
* Length values do **not** have units
* Only supported style properties are possible *(Remember: It's not CSS)*
* Styles are applied using `style` not `className`

### Using FelaComponent

```javascript
const style = {
  alignItems: 'center',
  padding: 20
}

<FelaComponent style={style}>
  {({ style, theme }) => (
    <View style={style}>
      <Text>Welcome!</Text>
    </View>
  )}
</FelaComponent>
```



<br>

---

### Related
* [react-fela](https://github.com/rofrischmann/fela/tree/master/packages/react-fela)
* [API Reference - `FelaComponent`](../api/bindings/FelaComponent.md)
* [API Reference - `FelaTheme`](../api/bindings/FelaTheme.md)
* [API Reference - `Provider`](../api/bindings/Provider.md)
* [API Reference - `ThemeProvider`](../api/bindings/ThemeProvider.md)
#### Renderer
**[fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native)**<br>
Renderer for React Native
