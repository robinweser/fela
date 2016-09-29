# Ecosystem

We decided to keep Fela as small and simple as possible. It only includes the renderer and two simple helpers. Yet it is designed to be highly extendable with both plugins and middleware.
Plugins are used to process your styles, enhancers to enhance your renderer. <br>
With this approach everyone is able to create a custom version of Fela fitting their particular needs.

Many plugins and enhancers are already included in the [main repository](https://github.com/rofrischmann/fela/tree/master/packages).

### Renderers
* [fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native) - React Native

### Bindings
* [react-fela](https://github.com/rofrischmann/react-fela) - React & React Native
* [inferno-fela](https://github.com/rofrischmann/inferno-fela) - Inferno

### Plugins
* [fela-plugin-custom-property](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-custom-property) - Resolves custom properties
* [fela-plugin-extend](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-extend) - Extend style objects based on conditions
* [fela-plugin-fallback-value](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-fallback-value) - Resolves arrays of fallback values
* [fela-plugin-friendly-pseudo-class](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-friendly-pseudo-class) - Transforms javascript-friendly pseudo class into valid syntax
* [fela-plugin-logger*](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-logger) - Logs rendered style objects
* [fela-plugin-lvha](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-lvha) - Sorts pseudo classes according to LVH(F)A
* [fela-plugin-prefixer](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-prefixer) - Adds all vendor prefixes to the styles
* [fela-plugin-dynamic-prefixer](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-dynamic-prefixer) - Adds minimum set of vendor prefixes to the styles by evaluating the userAgent
* [fela-plugin-remove-undefined](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-remove-undefined) - Removes `undefined` values and string values containing `undefined`
* [fela-plugin-unit](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-unit) - Automatically adds units to values if needed
* [fela-plugin-validator*](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-validator) - Validates, logs & optionally deletes invalid properties for keyframes and rules

#### Plugin-Presets
* [fela-preset-web](https://github.com/rofrischmann/fela/tree/master/packages/fela-preset-web) - Preset for cross-browser web applications
* [fela-preset-dev](https://github.com/rofrischmann/fela/tree/master/packages/fela-preset-dev) - Preset for development mode

### Enhancers
> **Warning**: Enhancers are still experimental and the API might change.

* [fela-beautifier*](https://github.com/rofrischmann/fela/tree/master/packages/fela-beautifier) - Beautifies the rendered CSS markup
* [fela-perf*](https://github.com/rofrischmann/fela/tree/master/packages/fela-perf) - Logs performance information (time elapsed while rendering)
* [fela-font-renderer](https://github.com/rofrischmann/fela/tree/master/packages/fela-font-renderer): Allocates `renderFont` calls to a separate Renderer instance to prevent refetching `@font-face` files every time.

### Tools
* [fela-stylesheet](https://github.com/rofrischmann/fela-stylesheet): Organize your rules grouped StyleSheets
* [fela-styles-connector](https://github.com/dustin-H/fela-styles-connector): Simplified react-fela `connect` with autobound styles

### Utilities
* [classnames](https://github.com/JedWatson/classnames): Manage and combine multiple className values safely
* [react-animations](https://github.com/FormidableLabs/react-animations): CSS animations to be used with CSS in JS solutions
* [react-styling](https://github.com/halt-hammerzeit/react-styling): Write your styles as CSS with [ECMAScript 2015 template strings](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/template_strings)
* [inline-style-transformer](https://github.com/rofrischmann/inline-style-transformer): CSS & style object transformation tools
* [stile](https://github.com/bloodyowl/stile): Handle units and string values
* [babel-plugin-css-to-js](https://github.com/jakecoxon/babel-plugin-css-to-js): Transform your CSS to JavaScript at compile time

<br>

------

\* Packages are considered dev tools and should therefore not be used in production.
