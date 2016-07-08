# Changelog

## 1

### 1.1
#### 1.1.0
##### API Changes
* enhancers can now be passed to `createRenderer` via config
  * makes `enhance` optional and is more simple to use

##### Improvements
* fixed `peerDependency` issues
* added style object shape validation to [fela-plugin-validator](packages/fela-plugin-validator)
* improved initial rendering performance
* added [fela-font-renderer](packages/fela-font-renderer) enhancer
* added [fela-plugin-extend](packages/fela-plugin-extend)
* improved [fela-perf](packages/fela-perf)
  * now logging rule, props and elapsed time
* improved [fela-beautifier](packages/fela-beautifier)
  * using a single entry now

------
### 1.0
#### 1.0.3
* updated [fela-plugin-prefixer](packages/fela-plugin-prefixer) to use [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer) version 2.0.0.
* added [fela-plugin-dynamic-prefixer](packages/fela-plugin-dynamic-prefixer)
* added `logMetaData` option to [fela-plugin-logger](packages/fela-plugin-logger)
* improved style diffing
* added `fela` as a `peerDependency` to every package

#### 1.0.2
* Added support multiple static styles assigned to a single selector ( [#55](https://github.com/rofrischmann/fela/issues/56) )

#### 1.0.1
Initial Version. *(1.0.0 can not be published as 1.0.0-beta.2 was already published before.)*
