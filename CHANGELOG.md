# Changelog

With version 10, we introduced synced package versions, which means the Changelog no longer needs to sorted by dates but rather versions again.<br>
If you're searching for older logs, please check the [old changelog](https://github.com/robinweser/fela/blob/8b61fc1845dba982956df0ed4d28eaa39b3c5d1c/CHANGELOG.md).

## 11.0

### 11.2.0
| Package | Changes |
| --- | --- |
| fela | ([#756](https://github.com/robinweser/fela/pull/756)) Added a `generateClassName` function to renderer which can now be overwritten |
| fela<br>fela-dom<br>react-fela<br>preact-fela<br>infero-fela<br>reason-fela<br>fela-bindings | ([#768](https://github.com/robinweser/fela/pull/768)) Added a new renderer option `styleNodeAttributes` for adding custom attributes to generated style nodes |
| fela-utils | ([#766](https://github.com/robinweser/fela/pull/766)) Fixed IE 11 compatibility issues |
| fela-sort-media-query-mobile-first<br>fela-preset-web | ([#769](https://github.com/robinweser/fela/pull/769)) Updated TypeScript definitions |
| fela<br>fela-plugin-prefixer<br>react-fela | ([#763](https://github.com/robinweser/fela/pull/763)) Added UMD builds for these specific packages - more to come |


### 11.1.1 / 11.1.2
| Package | Changes |
| --- | --- |
| react-fela<br>preact-fela<br>infero-fela<br>reason-fela<br>fela-bindings | ([#765](https://github.com/robinweser/fela/pull/765)) Fixed some regressions with missing exports concerning `renderToNodeList` |

### 11.1.0
| Package | Changes |
| --- | --- |
| preact-fela | ([#759](https://github.com/robinweser/fela/pull/759)) Upgraded Preact version to Preact X<br>([#760](https://github.com/robinweser/fela/pull/760)) Added Preact Typings |
| react-fela<br>preact-fela<br>infero-fela<br>reason-fela<br>fela-bindings | ([#753](https://github.com/robinweser/fela/pull/753)) Removed some old 10.x.x deprecated bindings<br>([#752](https://github.com/robinweser/fela/pull/752)) Added a `renderToNodeList`-method that returns an array of `style` elements<br>([#764](https://github.com/robinweser/fela/pull/764)) Fixed a bug where `className` was passed instead of `style` when using `FelaComponent` with `fela-native` |

### 11.0.1 / 11.0.2
| Package | Changes |
| --- | --- |
| reason-fela | More improvements to the ReasonML typings. |

### 11.0.0
| Package | Changes |
| --- | --- |
| fela<br>fela-dom | ([#750](https://github.com/robinweser/fela/pull/750)) Added the `sortMediaQuery` config option for more flexible and dynamic media query sorting. It is backwards compatible and respects `mediaQueryOrder`, but we decided to do a major release nevertheless. |
| fela-plugin-responsive-value | ([#748](https://github.com/robinweser/fela/pull/748)) Introducing a plugin to resolve responsive media query values. |
| fela-plugin-named-keys | ([#749](https://github.com/robinweser/fela/pull/749)) The plugin now merges resolve key values with existing key values. |
| fela-dom | ([#741](https://github.com/robinweser/fela/issues/741)) Fixed a bug where in devMode `@supports` rules weren't rendered correctly.<br />Fixed a big where static styles, keyframes and fonts were rendered twice. |

## 10.0
### 10.8.2
| Package | Changes |
| --- | --- |
| reason-fela | More improvements to the ReasonML typings. |

### 10.8.1
| Package | Changes |
| --- | --- |
| reason-fela | Several improvements to the ReasonML typings. |

### 10.8.0
| Package | Changes |
| --- | --- |
| reason-fela | Introducing official bindings for ReasonML. |

### 10.7.0
| Package | Changes |
| --- | --- |
| fela-sort-media-query-order | ([#737](https://github.com/robinweser/fela/pull/737)) Introducing a new enhancer that sorts a provided `mediaQueryOrder` using a mobile-first approach. |
| fela | ([#734](https://github.com/robinweser/fela/pull/734)) Improved the way `_className` special keys are resolved in `combineRules`. |
| fela-bindings<br>react-fela<br>inferno-fela<br>preact-fela | ([#736](https://github.com/robinweser/fela/issues/736)) Improved the `hasDOM` helper to ensure non-browser environments render correctly. |


### 10.6.1
| fela-bindings<br>react-fela<br>inferno-fela<br>preact-fela | ([#728](https://github.com/robinweser/fela/pull/728)) Hotfix that broke SSR with the new `targetDocument` option. |

### 10.6.0
| fela-dom<br>fela-bindings<br>react-fela<br>inferno-fela<br>preact-fela | ([#722](https://github.com/robinweser/fela/pull/722)) Added the ability to pass a `targetDocument` for DOM rendering. Defaults to `window.document`. |

### 10.5.0
| Package | Changes |
| --- | --- |
| fela-plugin-expand-shorthand | ([#711](https://github.com/robinweser/fela/pull/711)) Introducing a new plugin to expand (and optionally merge) shorthand properties. |
| fela | ([#710](https://github.com/robinweser/fela/pull/710)) Fixed a bug where font rendering returned invalid font faces. |


### 10.4.1
| Package | Changes |
| --- | --- |
| fela-plugin-embedded | Rule props are now always passed to the keyframe in order to read values from theme. |
| fela | Keyframes are now cached after being processed by plugins. |
| fela-dom<br>fela | Reverted the `rendererId` option that was introduced in ([#667](https://github.com/robinweser/fela/pull/667)) as it caused a couple of issues and is no longer neccessary with above changes. |

### 10.4.0
| Package | Changes |
| --- | --- |
| fela-beautifier | Make sure beautify is only used in devMode since it otherwise breaks DOM rendering in specific cases. |
| fela-sort-classnames | Introducing a new enhancer that sorts class names alphabetically. This is helpful for SSR consistency due to browser differences in object key iteration. |

### 10.3.0
| Package | Changes |
| --- | --- |
| fela<br>fela-utils<br>fela-dom | ([#707](https://github.com/robinweser/fela/pull/707)) Fixed a bug that caused rehydration mismatches when using dash-cased CSS property names. |
| fela-plugin-typescript | ([#701](https://github.com/robinweser/fela/pull/701)) Introducing the new TypeScript plugin that adds type-safety for CSS properties and provides auto-completion.  |


### 10.2.3
| Package | Changes |
| --- | --- |
| react-fela | ([#697](https://github.com/robinweser/fela/pull/697)) Improved TypeScript typins for the `useFela` hook API.<br>([#692](https://github.com/robinweser/fela/pull/692)) Improved TypeScript typings for the `FelaRenderer` component. |
| react-fela<br>preact-fela<br>inferno-fela<br>fela-bindings | ([#695](https://github.com/robinweser/fela/pull/695)) Improved TypeScript typins for the `connect` API. |
| fela-codemods | ([#691](https://github.com/robinweser/fela/pull/691)) Fix `render` -> `as` conversion edge cases. Don't convert args of callbacks _inside_ an inline `style` function, only the args to the `style` callback itself. |


### 10.2.2
| Package | Changes |
| --- | --- |
| fela-plugin-extend | ([#685](https://github.com/robinweser/fela/pull/685)) Added style extension for edge cases that weren't respected before. |
| fela-bindings<br>react-fela<br>preact-fela<br>inferno-fela | ([#686](https://github.com/robinweser/fela/pull/686)) Refactored the `ThemeProvider` component to match the old behaviour with auto-merging themes. |
| react-fela | ([#683](https://github.com/robinweser/fela/pull/683)) Added TypeScript typings for the new `useFela` hook API.<br>([#677](https://github.com/robinweser/fela/pull/677)) Added TypeScript typings for the `FelaRenderer` component.<br>([#678](https://github.com/robinweser/fela/pull/678)) Added a warning when `FelaComponent` is used without passing the `style` prop. |
| all | ([#680](https://github.com/robinweser/fela/pull/680)) Added sideEffects property to all packages in order to support Tree-Shaking in Webpack. |

### 10.2.1
| Package | Changes |
| --- | --- |
| fela-plugin-rtl | ([#673](https://github.com/robinweser/fela/pull/673)) Added the ability to pass a default direction in order to support full theme-based rtl transformation. |
| react-fela | ([#674](https://github.com/robinweser/fela/pull/674)) Performance optimisations for `useFela`. |
| fela-bindings<br>react-fela<br>preact-fela<br>inferno-fela | ([#675](https://github.com/robinweser/fela/pull/675)) Allowing `undefined` and `null` as valid values for style on `FelaRenderer` that used to throw. |

### 10.2.0
| Package | Changes |
| --- | --- |
| fela | ([#671](https://github.com/robinweser/fela/pull/671)) Updated Typings to use union types instead of enums. |
| fela<br>fela-dom | ([#667](https://github.com/robinweser/fela/pull/667)) Added the `rendererId` option to the renderer configuration which allows using multiple renderers with each maintaining their own set of style nodes. |
| fela-plugin-rtl<br>fela-plugin-bidi | ([#670](https://github.com/robinweser/fela/pull/670)) Added the ability to switch the transformation direction dynamically using a special theme property.  |
| react-fela | ([#669](https://github.com/robinweser/fela/pull/669)) Now correctly pass the theme to `useFela`'s props as well.<br>Now correctly pass `key` and `ref` to the `FelaComponent` directly instead of piping them to its rendered children. |
| fela-plugin-named-keys | Added the ability to dynamically set named keys using the given `props` of each rule. |

### 10.1.3
| Package | Changes |
| --- | --- |
| react-fela | ([#662](https://github.com/robinweser/fela/pull/662)) Updates TypeScript typings for FelaTheme. |

### 10.1.2
| Package | Changes |
| --- | --- |
| fela-plugin-extend<br>fela-dom | ([#658](https://github.com/robinweser/fela/pull/658)) Fix handling of `undefined` items in `extend` arrays.
| fela-dom | ([#600](https://github.com/robinweser/fela/pull/660)) Fixes `scoreIndex` mismatches with vendor-specific pseudo elements and selectors.|

### 10.1.1
| Package | Changes |
| --- | --- |
| fela<br>fela-dom | ([#656](https://github.com/robinweser/fela/pull/656)) Improve DOM Rendering performance by caching the default sorting score.
| react-fela | ([#652](https://github.com/robinweser/fela/pull/652)) Adds TypeScript typings for FelaComponent.<br>([#655](https://github.com/robinweser/fela/pull/655)) Adds TypeScript typings for RendererContext. |

### 10.1.0
| Package | Changes |
| --- | --- |
| react-fela | ([#648](https://github.com/robinweser/fela/pull/648)) Adds the new useFela hook API. |

### 10.0.2
| Package | Changes |
| --- | --- |
| fela-bindings<br>react-fela<br>preact-fela<br>inferno-fela | ([#645](https://github.com/robinweser/fela/pull/645)) Removed unnecessary shouldComponentUpdate in ThemeProvider due to the new Context API.<br>([#646](https://github.com/robinweser/fela/pull/646)) Fixed false-positive Provider deprecation warnings.<br>([#647](https://github.com/robinweser/fela/pull/647)) Now exposing both RendererContext and ThemeContext to be used with useContext. |

### 10.0.1
| Package | Changes |
| --- | --- |
| fela-plugin-custom-property<br>fela-plugin-embedded<br>fela-plugin-extend<br>fela-plugin-native-media-query<br>fela-plugin-simulate<br>fela-tools | ([#644](https://github.com/robinweser/fela/pull/644)) Fixed some old peerDependecies. |
| fela | ([#644](https://github.com/robinweser/fela/pull/644)) Improved TypeScript typings. |

### 10.0.0
| Package | Changes |
| --- | --- |
| react-fela<br>inferno-fela<br>preact-fela | ([#637](https://github.com/robinweser/fela/pull/637)) Migrated to the new Context API.<br>([#636](https://github.com/robinweser/fela/pull/636)) FelaComponent and FelaTheme introduced some major changes. Please check the migration guide for information. |
| fela-dom | ([#633](https://github.com/robinweser/fela/pull/633)) Style nodes are now correctly selected. |
