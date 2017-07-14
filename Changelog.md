# Changelog

## 5.0

#### 5.1.0
* introducing `createComponentWithProxy` ( [#306](https://github.com/rofrischmann/fela/pull/306) )
* added `filterClassName`-option to renderer config ( [#319](https://github.com/rofrischmann/fela/pull/319) )

#### 5.0.3
* prevent `fela-plugin-fallback-value` to resolve `fontFace`-property used for `fela-plugin-embedded` ( [#304](https://github.com/rofrischmann/fela/pull/304) )  

#### 5.0.2 (hot fix)
* fixed wrong `fela-dom` export

#### 5.0.1
* added `renderToSheetList` to `fela-dom` to enable custom server-side rendering
* introducing [fela-plugin-simulate](packages/fela-plugin-simulate) to simulate nested style objects e.g. pseudo classes and media queries ( [#261](https://github.com/rofrischmann/fela/pull/261) )

#### 5.0.0
Although all API changes ship with backward compatibility, we still publish a new major version as we changed a lot of internal infrastructure and want to make sure to not break existing applications in any way.

##### API Changes
* introducing the new [fela-dom](packages/fela-dom) server-side method `renderToMarkup` as well as a new improved `render` for to avoid FOUCs and big stylesheet rerenders. ( [#156](https://github.com/rofrischmann/fela/pull/156) )
* `connect` now directly accepts an object of named rules that are mapped to the `styles` prop. ( [#260](https://github.com/rofrischmann/fela/pull/260) )
* `createComponent`'s *passThroughProps* now either accept an array of prop keys or a function that returns an array of prop keys (instead of an object of props)

##### Improvements
* only set `id` and/or `style` on `createComponent` if actually required to reduce overhead
* introducing [fela-plugin-embedded](packages/fela-plugin-embedded) supporting inlined keyframes and font faces in rules ( [#238](https://github.com/rofrischmann/fela/pull/238) )
* introducing [fela-plugin-important](packages/fela-plugin-important) that adds `!important` to every declaration ( [#249](https://github.com/rofrischmann/fela/pull/249) )
* font rendering, especially SVG fonts, has been improved in many ways ( [#282](https://github.com/rofrischmann/fela/pull/282) )
* a bug in [fela-plugin-validator](packages/fela-plugin-validator) has been fixed to improve keyframe validation ( [#257](https://github.com/rofrischmann/fela/pull/257) )
* the [fela-monolithic](packages/fela-monolithic) enhancer has been completely rewritten for better performance ( [#256](https://github.com/rofrischmann/fela/pull/256) )

##### Infrastructure
We switched the whole project to an improved workflow with Lerna. This release is the first one done by Lerna.

## 4.0

---

#### 4.3.5 (hot fix)
* fix wrong `<ThemeProvider>` export

#### 4.3.4 (hot fix)
* revert ( [#239](https://github.com/rofrischmann/fela/pull/239) ) to fix `<ThemeProvider>`

#### 4.3.3
* using `prop-types` to support React >= 15.5 ( [#245](https://github.com/rofrischmann/fela/pull/245) )
* using `react-broadcast` to ensure a rerender on theme changes ( [#239](https://github.com/rofrischmann/fela/pull/239) )
* added support for Base64 font files ( [#242](https://github.com/rofrischmann/fela/pull/242) )
* fixed media query validator in [fela-plugin-validator](packages/fela-plugin-validator) ( [#231](https://github.com/rofrischmann/fela/pull/231) )


#### 4.3.2
* fixed render returns for `<Provider>` and `<ThemeProvider>` in [preact-fela](packages/preact-fela) ( [#228](https://github.com/rofrischmann/fela/pull/228) )
* added TypeScript typings to the plugin presets ( [#229](https://github.com/rofrischmann/fela/pull/229) )

#### 4.3.1 (hot fix)
* fix for wrong exports of [fela-plugin-fallback-value](packages/fela-plugin-fallback-value)

#### 4.3.0
##### Improvements
* introducting [preact-fela](packages/preact-fela) ( [#207](https://github.com/rofrischmann/fela/pull/207) )
* updated [inferno-fela](packages/inferno-fela) ( [#212](https://github.com/rofrischmann/fela/pull/212) )
* first-hand fela-native support for `createComponent` ( [#213](https://github.com/rofrischmann/fela/pull/213) )
* improved [fela-plugin-prefixer](packages/fela-plugin-prefixer) performance
* various small performance improvements

##### Infrastructure
* typed the whole code base with Flow
* using Jest and Prettier
* fixed package exports for JSPM users
* improved TypeScript type definitions
* many small documentation improvements

------

#### 4.2.6
* introducing the [fela-statistics](packages/fela-statistics) enhancer providing many different metrics to analyze your styling ( [#203](https://github.com/rofrischmann/fela/issues/203) )
* added the option to pass a static `className` to the fela-monolithic enhancer ( [#201](https://github.com/rofrischmann/fela/issues/201) )

#### 4.2.5
* updated both prefixer to [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer/blob/master/Changelog.md#300) 3.0.0
* added the `is` prop to `createComponent` to define a custom type on runtime

#### 4.2.4
* (hot)fixed weird bug introduced by switching `slice(1)` to `trim()`

#### 4.2.3
* introducing the [fela-monolithic](packages/fela-monolithic) enhancer to use component-based CSS classes instead of atomic ones ( [#195](https://github.com/rofrischmann/fela/issues/195) )
* improved style assigning to automatically merge arrays *e.g. when using [fela-plugin-extend](packages/fela-plugin-extend)*

#### 4.2.2
* fixed a bug that prevented the LVHA plugin from working correctly ( [#199](https://github.com/rofrischmann/fela/issues/199) )

#### 4.2.1
* removed deprecated `render` from [fela](packages/fela) in favor of [fela-dom](packages/fela-dom)
* using *try-catch* to catch unsupported rules inside `insertRule`
* removed a deprecated error for `undefined` values
* added the `innerRef` prop to pass a `ref` directly to `createComponent` components ( [#190](https://github.com/rofrischmann/fela/issues/190) )

#### 4.2.0
##### API Changes
* Rules support any extending (child) selectors using the `&`-prefix ( [#169](https://github.com/rofrischmann/fela/issues/169) )
* `createComponent` now automatically composes Fela Rules ( [#176](https://github.com/rofrischmann/fela/issues/176) )
* `createComponent`'s *passThrough* & *passThroughProps* now also accept a function ( [#174](https://github.com/rofrischmann/fela/issues/174) )


##### Improvements
* added [fela-plugin-named-media-query](packages/fela-plugin-named-media-query) which transforms named media queries into valid media query syntax ( [#182](https://github.com/rofrischmann/fela/issues/182) )
* added [fela-tools](packages/fela-tools) which provides useful tools for working with Fela (e.g. `StyleSheet` and `mapValueToMediaQuery`) ( [#183](https://github.com/rofrischmann/fela/issues/183) )


------

#### 4.1.2
* only use lowercase classNames to prevent issues in case sensitive modes ( [#167](https://github.com/rofrischmann/fela/issues/167) )
* added `selectorPrefix` option to renderer ( [#162](https://github.com/rofrischmann/fela/issues/162) )

#### 4.1.1
* added support for optional declarations by automatically removing `undefined` values and string values including `undefined` to support
* fixed a typo that lead to false logs using [fela-logger](packages/fela-logger)
* safe support for child selectors using the `>` special key
* *[react-fela]* treating id as a first class attribute which is passed through by default ( [#158](https://github.com/rofrischmann/fela/issues/158) )

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
