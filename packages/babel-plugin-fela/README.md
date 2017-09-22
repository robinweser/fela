# babel-plugin-fela

A babel plugin to optimize Fela rules.<br>
It will encapsulate static styles to be only rendered once.
<br>Optionally it can fully precompile static styles.

<img alt="npm version" src="https://badge.fury.io/js/babel-plugin-fela.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/babel-plugin-fela.svg">

## Installation
```sh
yarn add babel-plugin-fela
```
You may alternatively use `npm i --save babel-plugin-fela`.


## Limitations
> Before using this plugin, be sure to read the limitations.

Right now, it only transforms rules passed to the `createComponent`-HoC exported by [react-fela](../react-fela), [preact-fela](../preact-fela) and [inferno-fela](../inferno-fela).
Additionally those rules must either be defined within the same file or directly passed as a function. It accepts both basic functions as well as arrow functions.

More use cases will be added from time to time.

## Usage

### Static Style Encapsulation
Encapsulating static styles works by default. It will check the return value of your rule and extract every static property. Those will then be added as a separate `renderRule`-call which is only called the first time that rule is rendered.<br>
This will drastically improve any rule that renders multiple times.
##### Via .babelrc

```json
{
  "plugins": ["babel-plugin-fela"]
}
```

##### Via CLI

```sh
babel --plugins babel-plugin-fela script.js
```

##### Via Node API

```javascript
require('babel').transform('code', {
  plugins: ['babel-plugin-fela']
});
```

### Precompilation
In order to achieve precompilation, the plugin must be aware of the Fela renderer used to render our app. This can't be achieved within the `.babelrc` nor via CLI.<br>
We could use the Node API, but to be able to still use the other methods, we can also create our very own local plugin.<br>

We just create a plugin file *(e.g. babelPluginFela.js)*:

> Be aware that the we have to pass a function that returns the renderer rather than the renderer itself!

```javascript
import createPlugin from 'babel-plugin-fela/lib/createPlugin'

// add your personal fela configuration here
import { createRenderer } from 'fela'
const renderer = () => createRenderer()

// createPlugin accepts a single renderer option
export default createPlugin({
    renderer
})
```

Now we can just link to the relative path of our own plugin file.
```json
{
  "plugins": ["./babelPluginFela.js"]
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
