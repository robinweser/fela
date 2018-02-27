# Provider

Provider is used to pass the Fela renderer down to all your child components. It uses the [context](https://facebook.github.io/react/docs/context.html) feature to do so. It actually is all you need to fully use Fela within your application.

## Props

| Property | Type | Description |
| --- | --- |  --- |
| renderer | *[Renderer](../../basics/Renderer.md)* | The Fela renderer which is used to actually render our styles. | 

## Imports
```javascript
import { Provider } from 'react-fela'
import { Provider } from 'preact-fela'
import { Provider } from 'inferno-fela'
```

## Example
```javascript
import { createRenderer } from 'fela'

const renderer = createRenderer()

// Wrap your root application with the Provider
// to pass down the renderer to every component using context
<Provider renderer={renderer}>
  <App />
</Provider>
```