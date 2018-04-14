# fela-layout-debugger

<img alt="npm version" src="https://badge.fury.io/js/fela-layout-debugger.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-layout-debugger.svg">

Uses [styles-debugger](https://github.com/kitze/styles-debugger) to add outlines and labels to every rule component.
This helps to debug the application layout.<br>
Same rules will always have the same color.

## Installation
```sh
yarn add fela-layout-debugger
```
You may alternatively use `npm i --save fela-layout-debugger`.

## Usage
```javascript
import { createRenderer } from 'fela'
import layoutDebugger from 'fela-layout-debugger'

const renderer = createRenderer({
  enhancers: [ layoutDebugger() ]
})
```


### Configuration
##### Options
It takes an options object with the shape of the official [styles-debugger configuration options](https://github.com/kitze/styles-debugger#configuration-options).
##### Example
```javascript
import { createRenderer } from 'fela'
import layoutDebugger from 'fela-layout-debugger'

const layoutDebuggerEnhancer = layoutDebugger({
	pseudoElement: 'before',
	color: 'red',
	borderSize: 3,
	position: 3
})

const renderer = createRenderer({
  enhancers: [ layoutDebuggerEnhancer ]
})
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
