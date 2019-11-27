# renderToNodeList

This method returns a NodeList with `<style>` objects with the rendered CSS. This is useful for SSR (Server Side Rendering). This method uses the [fela-dom/renderToSheetList](../fela-dom/renderToSheetList) internally.

## Arguments
| Argument | Type | Description |
| --- | --- | --- |
| renderer | [*Renderer*](../fela/Renderer.md) | The renderer providing the styles which are rendered to a list of sheet data. |

### Returns
(*Object[]*): NodeList of style sheet nodes


### Example
```javascript
import { renderToNodeList } from 'react-fela'
import { createRenderer } from 'fela'

const renderer = createRenderer()
const Head = () => {
  return (
    <head>{renderToNodeList(renderer)}</head>
  )
}
```


