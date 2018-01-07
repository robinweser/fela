# Migration

This guide should help with migration from lower major versions.<br>
It is sorted by packages.

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