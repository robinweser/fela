# Changelog

## 3.0
#### 3.0.4
##### Improvements
* added [fela-plugin-placeholder-prefixer](packages/fela-plugin-placeholder-prefixer) which adds all prefixes to the `::placeholder` pseudo element ( [#95](https://github.com/rofrischmann/fela/issues/95) )
* added unit per property option to [fela-plugin-unit](packages/fela-plugin-placeholder-unit) ( [#96](https://github.com/rofrischmann/fela/issues/96) )

#### 3.0.2
##### Improvements
* added additional information to change objects that get emitted
* added [fela-logger](packages/fela-logger) which provides advanced logging ( [#93](https://github.com/rofrischmann/fela/issues/93) )

#### 3.0.1
##### Improvements
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
