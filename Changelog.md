# Changelog

## 4.0

#### 4.1.0
This release ships a lot of refactored code which lead to smaller package sizes, simpler and more readable code as well as higher performance.

* moved `render` into separate `fela-dom` package
* use atomic CSS design to improve performance and reuse styles on declaration base
* added [fela-style-debugger](packages/fela-style-debugger) which replaces  [fela-plugin-debug-layout](packages/fela-plugin-debug-layout)
* removed `defaultProps` from `renderRule` as they now are obsolete
* added `exclude` option to `fela-plugin-isolation` ( [#126](https://github.com/rofrischmann/fela/issues/126) )


------

#### 4.0.1
* fixed a bug where dynamic rules missed the static className in return ( [#151](https://github.com/rofrischmann/fela/issues/151) )

#### 4.0.0
While the changes in this version won't provide any "visible" improvements, actually a lot has happened under the hood. We are proud to introduce a much faster rendering mechanism. It now fully supports nested props and even returns even smaller classes. That way it is now possible to work with complex themes and advanced conditions.

##### API Changes
* `renderRule` now accepts a third parameter `defaultProps` ( [#140](https://github.com/rofrischmann/fela/issues/140) )
* *[react-fela]* `createComponent` now uses an array for `passThroughProps` ( [#148](https://github.com/rofrischmann/fela/issues/148) )
* *[react-fela]* `createComponent` also accepts a fourth parameter `defaultProps` ( [#140](https://github.com/rofrischmann/fela/issues/140) )
* *[react-fela]* Introducing `<ThemeProvider>` for component theming ( [#84](https://github.com/rofrischmann/fela/issues/84) )

##### Improvements
* hashing the style output rather than the input props
* added [fela-plugin-isolation](packages/fela-plugin-isolation) which provides true rule isolation ( [#118](https://github.com/rofrischmann/fela/issues/118) ) *(still experimental)*

## 3.0

#### 3.0.8
* fixed rendering order in production ( [#108](https://github.com/rofrischmann/fela/issues/108), [#111](https://github.com/rofrischmann/fela/issues/111) )
* added ability to order media queries explicitly ( [#110](https://github.com/rofrischmann/fela/issues/110) )
* *[react-fela]* added `passThrough` prop to `createComponent` to dynamically pass props to the underlaying element

#### 3.0.7
* Improved className readability when using `prettySelectors` ( [#98](https://github.com/rofrischmann/fela/issues/98) )
* *[react-fela]* `createComponent` now uses the `rule.name` as `displayName` ( [#99](https://github.com/rofrischmann/fela/issues/99) )

#### 3.0.6
##### Infrastructure
With this version, all packages have been moved to the main repository. Moved packages are **react-fela**, **inferno-fela** and **fela-stylesheet**. This helps to maintain the library and all its packages in a single place.

##### Improvements
* *[react-fela]* `createComponent` auto passes `style`, `id` and `className`
* *[react-fela]* `connect` invokes the component name for improved CSS debugging

#### 3.0.5
* proper className prefixing abilities ( [#96](https://github.com/rofrischmann/fela/issues/96) )
* combined rules are named `combined` with `prettySelectors` set to `true`

#### 3.0.4
* added [fela-plugin-placeholder-prefixer](packages/fela-plugin-placeholder-prefixer) which adds all prefixes to the `::placeholder` pseudo element ( [#95](https://github.com/rofrischmann/fela/issues/95) )
* added unit per property option to [fela-plugin-unit](packages/fela-plugin-placeholder-unit) ( [#96](https://github.com/rofrischmann/fela/issues/96) )

#### 3.0.2
* added additional information to change objects that get emitted
* added [fela-logger](packages/fela-logger) which provides advanced logging ( [#93](https://github.com/rofrischmann/fela/issues/93) )

#### 3.0.1
* added `prettySelectors` option to the renderer to enable human readable classNames while in a development environment. ( [#89](https://github.com/rofrischmann/fela/pull/89) )
* added [fela-plugin-debug-layout](packages/fela-plugin-debug-layout) which adds colored outlines to every element to debug styles

#### 3.0.0
##### API Changes
* `Renderer.subscribe` no longer receives the whole CSS string, but rather a change object describing what has been changed. However it gets the renderer passed as its second parameter which will let you get the whole CSS string using `.renderToString` anyway.

* **Rehydration** ( [#71](https://github.com/rofrischmann/fela/issues/71) )<br>
Rehydration has been added to the renderer which enables full style rehydration at runtime to evaluate rules again (e.g. when your application theming changes). It can be triggered using `Renderer.rehydrate`.<br>
While rehydrating, no DOM updates will happen. This happens with a single manipulation as soon as the full rehydration process is done.

##### Improvements
* Faster rule rendering in production using `CSSStyleSheet.insertRule`
* Added tons of new documentation content as well as 'Related' sections most of the articles

##### Bug Fixes
* fixed the `fela-preset-web` npm package which accidently contained the `fela-preset-dev` ( [#87](https://github.com/rofrischmann/fela/issues/87) )

## 2.0
#### 2.0.0
##### React Native support

## 1.0

#### 1.2.0
##### API Changes
* Diffing style objects is done **after** processing with plugins ( [#81](https://github.com/rofrischmann/fela/issues/81) )
* Added attribute and child selectors to rules ( [#69](https://github.com/rofrischmann/fela/issues/69) ) ( [#75](https://github.com/rofrischmann/fela/pull/75) )

##### Improvements
* [fela-plugin-friendly-pseudo-class](packages/fela-plugin-friendly-pseudo-class) supports nested pseudo classes
* added TypeScript Bindings and Angular support ( [#67](https://github.com/rofrischmann/fela/pull/67) )
* added support for multiple font family declarations ( [#76](https://github.com/rofrischmann/fela/pull/67) )
* added [fela-plugin-remove-undefined](packages/fela-plugin-remove-undefined)

------
#### 1.1.0
##### API Changes
* enhancers can now be passed to `createRenderer` via config ( [#63](https://github.com/rofrischmann/fela/issues/63) )
  * makes `enhance` optional and is more simple to use

##### Improvements
* fixed `peerDependency` issues
* added style object shape validation to [fela-plugin-validator](packages/fela-plugin-validator)
* improved initial rendering performance
* added [fela-font-renderer](packages/fela-font-renderer) enhancer ( [#55](https://github.com/rofrischmann/fela/issues/55) )
* added [fela-plugin-extend](packages/fela-plugin-extend) ( [#61](https://github.com/rofrischmann/fela/issues/61) )
* improved [fela-perf](packages/fela-perf)
  * now logging rule, props and elapsed time
* improved [fela-beautifier](packages/fela-beautifier)
  * using a single entry now

------

#### 1.0.3
* updated [fela-plugin-prefixer](packages/fela-plugin-prefixer) to use [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer) version 2.0.0 ( [#57](https://github.com/rofrischmann/fela/issues/57) )
* added [fela-plugin-dynamic-prefixer](packages/fela-plugin-dynamic-prefixer)
* added `logMetaData` option to [fela-plugin-logger](packages/fela-plugin-logger)
* improved dynamic style extraction (diffing)
* added `fela` as a `peerDependency` to every package

#### 1.0.2
* Added support multiple static styles assigned to a single selector ( [#56](https://github.com/rofrischmann/fela/issues/56) )

#### 1.0.1
Initial Version. *(1.0.0 can not be published as 1.0.0-beta.2 was already published before.)*
