# Migration

This guide should help with migration from lower major versions.<br>
It is sorted by packages.

## Table of Contents
- [babel-plugin-fela](#babel-plugin-fela)
- [fela-combine-arrays](#fela-combine-arrays)
- [fela-dom](#fela-dom)
- [fela-plugin-dynamic-prefixer](#fela-plugin-dynamic-prefixer)
- [fela-plugin-remove-undefined](#fela-plugin-remove-undefined)
- [inferno-fela](#inferno-fela)

## babel-plugin-fela

### 1.0.15
This package has been deprecated and removed as it does not add the desired benefits.<br>
One should remove it from their Babel config as it is no longer guaranteed to work as expected.


## fela-combine-arrays

### 1.0.9
This package has been deprecated as it is obsolete.<br>
css-in-js-utils' assignStyle now combines arrays by default.<br>
Please remove it from your Fela configuration.

## fela-dom

### 7.0.0
If you're using `renderToSheetList` on the server-side, you probably have to update the rendered `style` elements to also contain the `data-fela-support` attribute.

```javascript 
const sheetList = renderToSheetList(renderer)

const elements = sheetList.map(({ type, css, media, support }) =>
  <style
    dangerouslySetInnerHTML={{ __html: css }}
    data-fela-type={type}
    data-fela-support={support}
    key={`${type}-${media}`}
    media={media}
  />
)
```

## fela-plugin-dynamic-prefixer
### 5.0.10
This package has been deprecated and removed as the dynamic version of [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer) will no longer be maintained.<br>
Use [fela-plugin-prefixer](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-prefixer) instead. 

## fela-plugin-remove-undefined

### 5.0.21
This package has been deprecated and removed as Fela automatically removes `undefined` values.<br>
One should remove it form their Fela config as it no longer required.

## inferno-fela

### 10.0.0

Check the description for react-fela@10.0.0 below. It's the same changes for preact-fela as well.

### 8.0.0
In order to use inferno-fela > 8.0.0, Inferno > 4.0.0 is required.<br>
If you can't upgrade to Inferno 4.0.0 yet, consider using inferno-fela 7.0.1.

## preact-fela

### 10.0.0
Check the description for react-fela@10.0.0 below. It's the same changes for preact-fela as well.


## react-fela

### 10.0.0


#### Deprecating APIs
With this major release, we're deprecating a bunch of APIs that have been in use for almost 2 years which are **createComponent**, **createComponentWithProxy**, **connect** and **withTheme**.

> If you want to know why, please check the [umbrella PR](https://github.com/rofrischmann/fela/pull/597) and the [post on Medium](https://medium.com/felajs/the-future-of-fela-d4dad2efad00).

The new APIs use the render-props pattern rather than providing a HoC. If you're not familiar with the render-props, you should first [read about it](https://reactjs.org/docs/render-props.html).

In order to migrate to version 10.0.0, one must replace the following APIs:
| Old API | New API |
| --- | --- |
| createComponent<br>createComponentWithProxy<br>connect | FelaComponent |
| withTheme | FelaTheme |

> [Check out the detailed migration guide](./packages/react-fela/README.md#migration).

#### API Changes
Apart from the deprecation, we also changed some APIs in order to fully replace the deprecations.

##### FelaTheme
The FelaTheme component now no longer uses the special `render` prop to pass a render function, but uses `children` instead.

Check the [API Reference](docs/api/bindings/FelaTheme.md) for detailed information.

##### FelaComponent
The same goes for FelaComponent. We now use `children` directly rather than `render`. In order to pass a primitive render type, one may now use the `as` prop.

Instead of accepting both `style` and `rule` it now only accepts `style` but allows both style objects and rules. It even also accepts arrays of those.

Check the [API Reference](docs/api/bindings/FelaComponent.md) for detailed information.