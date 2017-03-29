# Usage with React Native

Fela is designed to be very modular and abstract. The renderer is the only platform specific component. With version 2.0.0 a new native renderer has been added which adds support for React Native. It can be used together with the existing  official [React bindings for Fela](https://github.com/rofrischmann/fela/tree/master/packages/react-fela).

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
* `createComponent` always requires the second parameter, and the second parameter should be the type and not the string (see example below)
* Length values do **not** have units
* Only supported style properties are possible *(It's not CSS!)*

### createComponent Example

Create the Component using the Type

```
const WelcomeText = createComponent(rule, View)
```

You can now use the component as a component or a wrapper
```
 render() {
    return (
      <Provider renderer={renderer}>
        <View>
          <WelcomeText><Text>Welcome to this awesome app</Text></WelcomeText>
        </View>
      </Provider>
    )
 }
```




<br>

---

### Related
* [react-fela](https://github.com/rofrischmann/fela/tree/master/packages/react-fela)
* [API reference - `Provider` ](https://github.com/rofrischmann/fela/tree/master/packages/react-fela/docs/Provider.md)
* [API reference - `connect` ](https://github.com/rofrischmann/fela/tree/master/packages/react-fela/docs/connect.md)
* [API reference - `createComponent` ](https://github.com/rofrischmann/fela/tree/master/packages/react-fela/docs/createComponent.md)
* [API reference - `ThemeProvider`](https://github.com/rofrischmann/fela/tree/master/packages/react-fela/docs/ThemeProvider.md)

#### Renderer
**[fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native)**<br>
Renderer for React Native
