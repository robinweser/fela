# Fonts

Another useful feature of CSS are [`@font-faces`](https://developer.mozilla.org/de/docs/Web/CSS/@font-face), which allow you to provide your own fonts.<br>
There are only seven different properties a `@font-face` rule accepts.

## Font Family & Source Files
The font family specifies a name which is later used to reference the font within other rules. The source files are basically relative or absolute paths pointing to a valid font file. Both are required to get a valid font face rendered.

## Font Properties
In addition to the required parameters, each font face accepts five other properties to customize the font. They all are standard CSS properties:

* `fontVariant`
* `fontStretch`
* `fontWeight`
* `fontStyle`
* `unicodeRange`

<br>

---

### Related
* [Rendering fonts](Renderer.md#renderfont)
* [Problems with fonts](../Troubleshooting.md#1-rendering-fonts)
* [API reference - `Renderer.renderFont` ](../api/Renderer.md#renderfontfamily-files-properties)
* [FAQ - Fonts](../FAQ.md#fonts)

#### Tools
**[fela-font-renderer](https://github.com/rofrischmann/fela/tree/master/packages/fela-font-renderer)**<br>
Allocates `renderFont` calls to a separate Renderer instance to prevent refetching `@font-face` files every time
