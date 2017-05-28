# `renderToMarkup(renderer)`

Renders all cached styles grouped CSS strings and returns a valid HTML markup with `<style>` elements. The elements are grouped and sorted in the following order:

1. Fonts
2. Static Styles
3. Rules
4. Media Query Rules
5. Keyframes

This method is used for universal rendering. The DOM renderer is able to reuse the rendered style elements and markup without updating the DOM again.

### Returns
(*string*): Single concatenated HTML markup string containing required `<style>` elements.

### Example
```javascript
import { renderToMarkup } from 'fela-dom/server'
import { createRenderer } from 'fela'

const renderer = createRenderer()

const rule = ({ fontSize }) => ({
  fontSize: fontSize,
  color: 'blue',
  '@media (min-width: 300px)': {
    color: 'red'
  }
})

renderer.renderStatic('html,body{box-sizing:border-box;margin:0}').
renderer.renderRule(rule, { fontSize: '12px' })

const markup = renderToMarkup(renderer)

console.log(markup)
// <style type="text/css" data-fela-type="STATIC">html,body{box-sizing:border-box;margin:0}</style>
// <style type="text/css" data-fela-type="RULE">.a{font-size:12px}.b{color:blue}</style>
// <style type="text/css" data-fela-type="RULE" media="(min-width: 300px)">.c{color:red}</style>
```
