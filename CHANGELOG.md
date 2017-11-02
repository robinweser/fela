# Changelog

We recently introduced a new way to add release notes based on the publication date.
If you're searching for older version-based release notes please check out the old [Changelog](https://github.com/rofrischmann/fela/blob/79f14a6e98079482309507a3bd5b263d7a892f42/Changelog.md).

> Dates follow the `dd/mm/yy` notation.

## 01/11/17
| Package | Version | Changes |
| ---- | --- | --- |
| fela-plugin-custom-property<br>fela-plugin-extend<br>fela-plugin-native-media-query<br>fela-plugin-simulate | major | remove backwards compatibility and add peer dependency for Fela > 6 |

## 31/10/17
| Package | Version | Changes |
| ---- | --- | --- |
| fela | 6.0.4 | [(#442)](https://github.com/rofrischmann/fela/pull/442) added support for [Woff2](https://www.w3.org/TR/WOFF2/) font format  | 
| fela-plugin-bidi | 2.0.0 | [(#449)](https://github.com/rofrischmann/fela/pull/449) updated to a new major version of [bidi-css-js](https://github.com/TxHawks/bidi-css-js) |
| fela-combine-arrays | 1.0.3 | [(#451)](https://github.com/rofrischmann/fela/pull/451) fixed a bug where objects got converted to arrays |
| fela-plugin-extend | 5.0.12 | [(#456)](https://github.com/rofrischmann/fela/pull/456) fixed a bug where nested extend objects could not be resolved |
| fela-plugin-custom-property<br>fela-plugin-extend<br>fela-plugin-native-media-query<br>fela-plugin-simulate |  | fixed a semantic versioning issue and added backwards compatibility |

## 20/10/17
| Package | Version | Changes |
| ---- | --- | --- |
| fela-dom | 6.0.3 | [(#434)](https://github.com/rofrischmann/fela/pull/434) fixed rehydration errors and added some safety checks to only rehydrate under certain circumstances<br>[(#429)](https://github.com/rofrischmann/fela/pull/429) only subscribe to changes once per renderer within `render()` |
| fela-preset-web | 7.0.0 | [(#433)](https://github.com/rofrischmann/fela/pull/433) added fela-plugin-embedded to the web preset |
| fela-native | 5.0.11 | fixed a bug when combining rules |

## 11/10/17
| Package | Version | Changes |
| ---- | --- | --- |
| react-fela<br>inferno-fela<br>preact-fela | 6.0.2 | fixed a bug where special props (style, id, as, className, innerRef) aren't passed down to composed Fela components |

All package dependencies are now marked as exact versions in order to prevent false-positive patch updates.

## 09/10/17
| Package | Version | Changes |
| ---- | --- | --- |
| fela-dom | 6.0.1 | [(#405)](https://github.com/rofrischmann/fela/pull/405) fixed a bug that caused incorrect rehydration |
| react-fela<br>inferno-fela<br>preact-fela | 6.0.1 | only pass passThroughProps that are **not** undefined<br> [(#416)](https://github.com/rofrischmann/fela/pull/416) added missing withTheme exports to preact-fela and inferno-fela<br>[(#397)](https://github.com/rofrischmann/fela/pull/397) [(#421)](https://github.com/rofrischmann/fela/pull/421) several small bug fixes<br/>[(#407)](https://github.com/rofrischmann/fela/pull/407) improved theming performance by only updating the theme if it actually changes<br>[(#410)](https://github.com/rofrischmann/fela/pull/410) added support for rule functions passed as extend prop |
| fela-combine-arrays | 1.0.0 | An enhancer to enable merging arrays while combining rules |

## 22/09/17
| Package | Version | Changes |
| ---- | --- | --- |
| fela | 6.0.0 | ([#363](https://github.com/rofrischmann/fela/pull/363)) Completely new caching mechanism<br> ([#328](https://github.com/rofrischmann/fela/issues/328)) added support for `@supports` queries |
| fela-dom | 6.0.0 | Rehydration for rules and media rules |
| react-fela<br>inferno-fela<br>preact-fela | 6.0.0 | ([#367](https://github.com/rofrischmann/fela/issues/367)) ThemeProvider now uses the the publish-subscribe design pattern to safely spread the theme<br> ([#384](https://github.com/rofrischmann/fela/issues/384)) The former `is` prop now is called `as` due to overlapping with the official web components specification<br> ([#313](https://github.com/rofrischmann/fela/pull/313)) Static properties and methods are now hoisted |
| babel-plugin-fela | 1.0.0 | ([#305](https://github.com/rofrischmann/fela/issues/305)) Babel plugin to optimize style rendering & performance |
| fela-plugin-bidi | 1.0.0 | ([#381](https://github.com/rofrischmann/fela/issues/381)) An alternative to [fela-plugin-rtl](packages/fela-plugin-rtl) based on CSSWG's [Logical Properties and Values Level 1 proposal](https://www.w3.org/TR/css-logical-1/) |
| fela-utils | 7.0.0 | Some utilities have been added and some removed/moved |

All fela-utils dependents have been upgraded by a patch release to match the new version.

## 01/09/17
| Package | Version | Changes |
| ---- | --- | --- |
| fela | 5.2.0 | ([#357](https://github.com/rofrischmann/fela/issues/357)) `renderer.filterClassName` now defaults to blocking class names including `ad` by default |
| react-fela<br>inferno-fela<br>preact-fela | 5.3.0 | ([#362](https://github.com/rofrischmann/fela/pull/362)) The  `connect`-HoC now supports `defaultProps` |

## 22/08/17
| Package | Version | Changes |
| ---- | --- | --- |
| fela-utils | 6.0.0 | ([#347](https://github.com/rofrischmann/fela/pull/347)) Fixed className generation to support `renderer.filterClassName` correctly |
| fela-plugin-rtl | 1.0.0 | ([#351](https://github.com/rofrischmann/fela/pull/351)) Initial release to support right-to-left conversion |
| fela-layout-debugger | 6.0.0 | ([#352](https://github.com/rofrischmann/fela/pull/352)) Now uses [styles-debugger](https://github.com/kitze/styles-debugger) |

All [fela-utils](https://github.com/rofrischmann/fela/tree/master/packages/fela-utils) dependents have been upgraded by a patch release to match the new major version.

## 03/08/17

| Package | Version | Changes |
| ---- | --- | --- |
| fela | 5.1.0 | ([#335](https://github.com/rofrischmann/fela/pull/335)) Ability to specify `local()` font names within `renderFont` |
| fela-plugin-embedded | 5.1.0 | ([#330](https://github.com/rofrischmann/fela/pull/330)) Ability to use multiple animations and font faces |
| react-fela<br>inferno-fela<br>preact-fela | 5.2.0 | ([#321](https://github.com/rofrischmann/fela/pull/321)) `defaultProps` are now also passed to Fela rules<br>([#322](https://github.com/rofrischmann/fela/pull/332)) `createComponentWithProxy` now filters out `innerRef` and `in` |
