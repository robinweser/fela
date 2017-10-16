# Explicit Component displayName

Sometimes, you need to have an explicit displayName for your components rather than the default `FelaComponent` for debugging, or maybe for things like storybook. Right now, there is no automatic way to do this.

## Using a HoC

One way to handle this problem this is by using a HoC. We recommend [recompose](https://github.com/acdlite/recompose).
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

## Other solutions

Like I said ealier, there is no automatic solution to handle this case right now.
But, there are possibilities with Babel plugins that might help out. The most promising one is [babel-plugin-transform-react-stateless-component-name](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name).
Right now, it can't handle HoCs, but people are working on it and maybe someday we'll be able to use Babel instead.
