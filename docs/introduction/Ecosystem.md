# Ecosystem

We decided to keep Fela as small and simple as possible. It only includes the renderer and two simple helpers. Yet it is designed to be highly extendable with both plugins and middleware.
Plugins are used to process your styles, enhancers to enhance your renderer. <br>
With this approach everyone is able to create a custom version of Fela fitting their particular needs.

Many plugins and enhancers are already included in the [main repository](https://github.com/rofrischmann/fela/tree/master/packages).

### Renderers
* [fela](https://github.com/rofrischmann/fela/tree/master/packages/fela) - Web *(universal)*
* [fela-dom](https://github.com/rofrischmann/fela/tree/master/packages/fela-dom) - Web *(DOM bindings)*
* [fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native) - React Native

### Bindings
* [react-fela](https://github.com/rofrischmann/fela/tree/master/packages/react-fela) - React & React Native
* [preact-fela](https://github.com/rofrischmann/fela/tree/master/packages/preact-fela) - Preact
* [inferno-fela](https://github.com/rofrischmann/fela/tree/master/packages/inferno-fela) - Inferno
* [hyper-fela](https://github.com/ahdinosaur/hyper-fela) - HyperScript
* [cycle-fela](https://github.com/wcastand/cycle-fela) - Cycle

### Plugins
* [fela-plugin-custom-property](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-custom-property) - Resolves custom properties
* [fela-plugin-embedded](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-embedded) - Automatically Resolves embedded font faces and keyframes within rules
* [fela-plugin-extend](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-extend) - Extend style objects based on conditions
* [fela-plugin-fallback-value](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-fallback-value) - Resolves arrays of fallback values
* [fela-plugin-friendly-pseudo-class](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-friendly-pseudo-class) - Transforms javascript-friendly pseudo class into valid syntax
* [fela-plugin-important](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-important) - Adds `!important` to every value
* [fela-plugin-isolation](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-isolation) - Adds style isolation to every rule
* [fela-plugin-logger*](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-logger) - Logs processed style objects
* [fela-plugin-lvha](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-lvha) - Sorts pseudo classes according to LVH(F)A
* [fela-plugin-named-media-query](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-named-media-query) - Transforms named media query keys into valid syntax
* [fela-plugin-placeholder-prefixer](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-placeholder-prefixer) - Adds all `::placeholder` prefixes
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
* ~~[fela-font-renderer](https://github.com/rofrischmann/fela/tree/master/packages/fela-font-renderer): Allocates `renderFont` calls to a separate Renderer instance to prevent refetching `@font-face` files every time.~~ (*Deprecated*)
* [fela-layout-debugger*](https://github.com/rofrischmann/fela/tree/master/packages/fela-layout-debugger) - Adds colored outlines or backgroundColors to debug layouts
* [fela-logger*](https://github.com/rofrischmann/fela/tree/master/packages/fela-logger) - Logs every rendered change output
* [fela-monolithic](https://github.com/rofrischmann/fela/tree/master/packages/fela-monolithic) - Render component-based (monolithic) CSS classes (rather than atomic)
* [fela-perf*](https://github.com/rofrischmann/fela/tree/master/packages/fela-perf) - Logs performance information (time elapsed while rendering)
* [fela-statistics*](https://github.com/rofrischmann/fela/tree/master/packages/fela-statistics) - Collects different metrics to analyze your styles

### Components
* [cf-ui](https://github.com/cloudflare/cf-ui): Cloudflare UI Framework
* [just-box](https://github.com/RafalFilipek/just-box): Create universal layouts in React and React-Native
* [kilvin](https://github.com/rofrischmann/kilvin): Primitive React Layout Components

### Tools
* [fela-react-prop](https://github.com/codepunkt/fela-react-prop): Helps to pass classNames to specific props
* [fela-tools](https://github.com/rofrischmann/fela/tree/master/packages/fela-tools): Useful tools for working with Fela
* [fela-styles-connector](https://github.com/dustin-H/fela-styles-connector): Simplified react-fela `connect` with autobound styles

### Utilities
* [aesthetic](https://github.com/milesj/aesthetic) - React style and theme layer with Fela support
* [babel-plugin-css-to-js](https://github.com/jakecoxon/babel-plugin-css-to-js): Transform your CSS to JavaScript at compile time
* [classnames](https://github.com/JedWatson/classnames): Manage and combine multiple className values safely
* [css-functions](https://github.com/cssinjs/css-functions): Functional API to create CSS functions including value validation
* [css-spring](https://github.com/codepunkt/css-spring): Generate physics based css-keyframe animations for the css-in-js solution of your choice or plain css
* [css-to-object](https://github.com/jxnblk/css-to-object): Convert flat CSS rules to JavaScript style objects
* [fela-components](https://github.com/arturmuller/fela-components): Styling library for React and Fela
* [fela-react-prop](https://github.com/codepunkt/fela-react-prop): Generate class names for fela style rule and apply them as property on a wrapped component
* [frejya](https://github.com/benoneal/freyja): Pass styles as props to components
* [objectify-css](https://github.com/lachlanjc/objectify-css): CLI for converting CSS rules to JavaScript style objects
* [polished](https://github.com/styled-components/polished): A lightweight toolset for writing styles in JavaScript
* [react-animations](https://github.com/FormidableLabs/react-animations): CSS animations to be used with CSS in JS solutions
* [react-styling](https://github.com/halt-hammerzeit/react-styling): Write your styles as CSS with [ECMAScript 2015 template strings](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/template_strings)
* [stile](https://github.com/bloodyowl/stile): Handle units and string values
* [storybook-addon-props-fela](https://github.com/Kilix/storybook-addon-props-fela): Document the props of your Fela components in storybook.

<br>

------

\* Packages are considered dev tools and should therefore not be used in production.
