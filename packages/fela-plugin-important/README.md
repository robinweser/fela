# fela-plugin-important

<img alt="npm version" src="https://badge.fury.io/js/fela-plugin-important.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-important.svg">

Adds `!important` to every declaration value except animations item and keyframes. This helps to force specificity over third-party libraries. Animation items and keyframes with `!important` disrupt functionality of animations. [More about.](https://developer.mozilla.org/en-US/docs/Web/CSS/%40keyframes#!important_in_a_keyframe) 

## Installation
```sh
yarn add fela-plugin-important
```
You may alternatively use `npm i --save fela-plugin-important`.


## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import important from 'fela-plugin-important'

const renderer = createRenderer({
  plugins: [ important() ]
})
```

## Example
#### Input
```javascript
{
  width: '25px',
  display: [ '-webkit-flex', 'flex' ],
  fontWeight: 'normal'
}
```
#### Output
```javascript
{
  width: '25px!important',
  display: [ '-webkit-flex!important', 'flex!important' ],
  fontWeight: 'normal!important'
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
