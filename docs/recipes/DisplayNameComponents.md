# displayName on React Components

Sometimes, you need to have a explicit displayName on your components and not the default `FelaComponent` for debugging, or maybe for things like storybook. Right now, there isn't an automatic way to do this.

## use a HOC

One way to handle this problem is with HOC. we recommand you to use [recompose](https://github.com/acdlite/recompose).
When you export your components, just use the HOC [setDisplayName](https://github.com/acdlite/recompose/blob/master/docs/API.md#setdisplayname).

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

## More solutions in the future

Like i said ealier, there is no automatic solution to handle this case right now.
But, they are possibilities with babel plugins to help us out. The most promising one is [babel-plugin-transform-react-stateless-component-name](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name)
Right now, it can't handle HOC but people are working on it and maybe someday, will be able to let babel handle this for us.