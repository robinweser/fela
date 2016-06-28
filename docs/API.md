# API Reference

Last but not least this chapter ships the API reference in detail. Despite explaining every single method its arguments and return value, you will also find some tips on some pages.

## Top-Level API
* [`createRenderer([config])`](api/createRenderer.md)
* [`render(renderer, mountNode)`](api/render.md)
* [`combineRules(...rules)`](api/combineRules.md)
* [`enhance(...enhancers)`](api/enhance.md)

#### [Renderer API](api/Renderer.md)
* [`.renderRule(rule, [props])`](api/Renderer.md#renderrulerule--props)
* [`.renderKeyframe(keyframe, [props])`](api/Renderer.md#renderkeyframe--props)
* [`.renderFont(family, files, [properties])`](api/Renderer.md#renderfontfamily-files--properties)
* [`.renderStatic(style, [selector])`](api/Renderer.md#renderstaticstyle--reference)
* [`.renderToString()`](api/Renderer.md#rendertostring)
* [`.subscribe(listener)`](api/Renderer.md#subscribelistener)
* [`.clear()`](api/Renderer.md#clear)
