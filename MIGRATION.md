# Migration

This guide should help with migration from lower major versions.<br>
It is sorted by packages.

## Table of Contents
- [babel-plugin-fela](#babel-plugin-fela)
- [fela-dom](#fela-dom)
- [fela-combine-arrays](#fela-combine-arrays)
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

### 8.0.0
In order to use inferno-fela > 8.0.0, Inferno > 4.0.0 is required.<br>
If you can't upgrade to Inferno 4.0.0 yet, consider using inferno-fela 7.0.1.