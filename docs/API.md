# API Reference

Last but not least this chapter ships the API reference in detail. Despite explaining every single method its arguments and return value, you will also find some tips on some pages.

## Top-Level API
### fela
* [`createRenderer([config])`](api/fela/createRenderer.md)
* [`combineRules(...rules)`](api/fela/combineRules.md)
* [`enhance(...enhancers)`](api/fela/enhance.md)

#### [Renderer API](api/fela/Renderer.md)
* [`.renderRule(rule, [props])`](api/fela/Renderer.md#renderrulerule--props)
* [`.renderKeyframe(keyframe, [props])`](api/fela/Renderer.md#renderkeyframe--props)
* [`.renderFont(family, files, [properties])`](api/fela/Renderer.md#renderfontfamily-files--properties)
* [`.renderStatic(style, [selector])`](api/fela/Renderer.md#renderstaticstyle--selector)
* [`.renderToString()`](api/fela/Renderer.md#rendertostring) *(Deprecated)*
* [`.subscribe(listener)`](api/fela/Renderer.md#subscribelistener)
* [`.clear()`](api/fela/Renderer.md#clear)

---

### fela-dom
* [`render(renderer)`](api/fela-dom/render.md)
* [`renderToString(renderer)`](api/fela-dom/renderToString.md)
* [`renderToMarkup(renderer)`](api/fela-dom/renderToMarkup.md)
* [`renderToElement(renderer)`](api/fela-dom/renderToElement.md)

---

### fela-native
* [`createRenderer([config])`](api/fela-native/createRenderer.md)

#### [Renderer API](api/fela-native/Renderer.md)
* [`.renderRule(rule, [props])`](api/fela-native/Renderer.md#renderrulerule--props)
* [`.subscribe(listener)`](api/fela-native/Renderer.md#subscribelistener)
* [`.clear()`](api/fela-native/Renderer.md#clear)
