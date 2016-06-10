# Ecosystem

We decided to keep Fela as small and simple as possible. It only includes the renderer and two simple helpers. Yet it is designed to be highly extendable with both plugins and middleware.
Plugins are used to process your styles, middleware to enhance your renderer. <br>
With this approach everyone is able to use their own configurations to fit their needs.

Many plugins and even middlewares are already included in the [main repository](https://github.com/rofrischmann/fela/tree/master/packages).

### Bindings
* [react-fela](https://github.com/rofrischmann/react-fela) - React

### Plugins
* [fela-plugin-custom-property](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-custom-property) - Resolves custom properties
* [fela-plugin-fallback-value](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-fallback-value) - Resolves arrays of fallback values
* [fela-plugin-friendly-pseudo-class](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-friendly-pseudo-class) - Transforms javascript-friendly pseudo class into valid syntax
* [fela-plugin-lvha](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-lvha) - Sorts pseudo classes according to LVH(F)A
* [fela-plugin-prefixer](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-prefixer) - Adds vendor prefixes to the styles
* [fela-plugin-unit](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-unit) - Automatically adds units to values if needed

### Middleware
> Most middlewares are only used in development (dev-tools) and should be excluded in production.

* [fela-beautifier](https://github.com/rofrischmann/fela/tree/master/packages/fela-beautifier) - Beautifies the rendered CSS markup
* [fela-logger](https://github.com/rofrischmann/fela/tree/master/packages/fela-logger) - Logs changes (rendered CSS)
* [fela-perf](https://github.com/rofrischmann/fela/tree/master/packages/fela-perf) - Logs performance information (elapsed time to render)
