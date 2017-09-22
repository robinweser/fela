# Changelog

We recently introduced a new way to add release notes based on the publication date.
If you're searching for older version-based release notes please check out the old [Changelog](https://github.com/rofrischmann/fela/blob/79f14a6e98079482309507a3bd5b263d7a892f42/Changelog.md).

> Dates follow the `dd/mm/yy` notation.

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
