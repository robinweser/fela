# Explicit Component displayName

Sometimes, you need to have an explicit `displayName` for your components rather than the default `FelaComponent` for debugging, or maybe for things like storybook.

## Babel

One way to handle this is by using [babel-plugin-transform-react-fela-display-name](https://www.npmjs.com/package/babel-plugin-transform-react-fela-display-name). This is likely the preferred solution, as it handles the transformation at compmile time instead of runtime, preventing you from having to bring in extra dependencies.

## Using a HoC

If you aren't using Babel, another way to handle this problem is by using a HoC. We recommend [recompose](https://github.com/acdlite/recompose).
When you export your components, just use the HoC [setDisplayName](https://github.com/acdlite/recompose/blob/master/docs/API.md#setdisplayname).

```javascript
import { createComponent } from 'react-fela'
import { setDisplayName } from 'recompose'

const container = ({ padding }) => ({
  padding: padding + 'px',
  backgroundColor: 'rgb(124, 114, 231)',
  fontSize: '20px'
})

const Container = createComponent(container)

export default setDisplayName('Container')(Container)
```
