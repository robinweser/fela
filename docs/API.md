# API Reference

Last but not least this chapter ships the API reference in detail. Despite explaining every single method its arguments and return value, you will also find some tips on some pages.

## Top-Level API
#### fela
* [`createRenderer([config])`](api/fela/fela/createRenderer.md)
* [`combineRules(...rules)`](api/fela/fela/combineRules.md)
* [`enhance(...enhancers)`](api/fela/fela/enhance.md)

#### fela-dom
* [`render(renderer, mountNode)`](api/fela/fela-dom/render.md)

## [Renderer API](api/fela/fela/Renderer.md)
* [`.renderRule(rule, [props])`](api/fela/fela/Renderer.md#renderrulerule--props)
* [`.renderKeyframe(keyframe, [props])`](api/fela/fela/Renderer.md#renderkeyframe--props)
* [`.renderFont(family, files, [properties])`](api/fela/fela/Renderer.md#renderfontfamily-files--properties)
* [`.renderStatic(style, [selector])`](api/fela/fela/Renderer.md#renderstaticstyle--reference)
* [`.renderToString()`](api/fela/fela/Renderer.md#rendertostring)
* [`.subscribe(listener)`](api/fela/fela/Renderer.md#subscribelistener)
* [`.clear()`](api/fela/fela/Renderer.md#clear)
