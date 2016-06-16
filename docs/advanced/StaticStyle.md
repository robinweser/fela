# Global & Third-Party Styles

It is a common technique to start the whole styling process by adding some global styles such as CSS resets.<br>
In addition you might also include some fancy third-party styles. The renderer provides a specific render-method called `renderStatic`.
It accepts either a valid CSS string or a basic style object with a custom selector to be rendered into.<br>

### CSS String
Rendering CSS strings is especially helpful if you want to use third-party or legacy styles written in CSS.

```javascript
import { createSelector } from 'fela'

const renderer = createRenderer()

renderer.renderStatic('*{margin:0;padding:0}')
```

### Style Object
If you prefer using style objects, do not forget to provide a selector as well.
> **Note**: Style objects will also be processed by all applied plugins.

```javascript
import { createSelector } from 'fela'

const renderer = createRenderer()

const styleObject = {
  fontSize: '12px',
  width: '100%',
  display: 'flex'
}

renderer.renderStatic(styleObject, 'html,body,#app')
```
