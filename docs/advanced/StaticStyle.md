# Global & Third-Party Styles

It is a common technique to start the whole styling process by adding some global styles such as CSS resets.<br>
In addition you might also include some fancy third-party styles. For this the renderer provides a method called `renderStatic`.
It accepts either a valid CSS string or a basic style object with a custom selector to be rendered into.<br>

### Style Object
If you prefer using style objects, do not forget to provide a selector as well.
> **Note**: Style objects will also be processed by all applied plugins.

```javascript
import { createRenderer } from 'fela'

const renderer = createRenderer()

const styleObject = {
  fontSize: '12px',
  width: '100%',
  display: 'flex'
}

renderer.renderStatic(styleObject, 'html,body,#app')
```

### CSS String
Rendering CSS strings is especially helpful if you want to use third-party or legacy styles written in CSS.<br>
This method is **not recommended** as no further processing with plugins is done. It only be used to insert large third-party CSS files.

```javascript
import { createRenderer } from 'fela'

const renderer = createRenderer()

renderer.renderStatic('*{margin:0;padding:0}')
```

Using [ECMAScript 2015 template strings](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/template_strings) we can even write multi-line CSS styles. <br>This is helpful if we want to copy large CSS files directly into our JavaScript file.
```javascript
import { createRenderer } from 'fela'

const renderer = createRenderer()

renderer.renderStatic(`
  * {
    margin: 0;
    padding: 0
  }

  body, html {
    width: 100%;
    height: 100%
  }

  div {
    display: -webkit-flex;
    display: -moz-flex;
    display: flex
  }
`)
```

<br>

---

### Related
* [API reference - `Renderer.renderStatic`](../api/Renderer.md#renderstaticstyle-selector)
