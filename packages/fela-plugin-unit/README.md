# fela-plugin-unit

<img alt="npm version" src="https://badge.fury.io/js/fela-plugin-unit.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-unit.svg"> <a href="https://bundlephobia.com/result?p=fela-plugin-unit@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela-plugin-unit.svg"></a>

Always writing length values as string with a value applied seems not like the JavaScript way to do it. You can also use mathematics to process number values. <br>
It is aware of unitless properties such as `lineHeight`, zero-values and also adds units to multiple values inside an array.

## Installation
```sh
yarn add fela-plugin-unit
```
You may alternatively use `npm i --save fela-plugin-unit`.



## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import unit from 'fela-plugin-unit'

const renderer = createRenderer({
  plugins: [ unit() ]
})
```

### Configuration
##### Parameters
| Parameter | Value | Default | Description |
| --- | --- | --- | --- |
| unit | `ch`, `em`, `ex`, `rem`, `vh`, `vw`, `vmin`, `vmax`, `px`, `cm`, `mm`, `in`, `pc`, `pt`, `mozmm` | `px` | unit which gets applied |
| unitPerProperty | *(Object)* | `{}` | Default units per property |
| isUnitlessProperty | *(Function)* | [`util function`](https://github.com/robinweser/css-in-js-utils/blob/master/modules/isUnitlessProperty.js) | check whether property should remain unitless |

##### Example
```javascript
import { createRenderer } from 'fela'
import unit from 'fela-plugin-unit'

const unitPlugin = unit('em', {
  margin: '%',
  fontSize: 'pt'
})

const renderer = createRenderer({
  plugins: [ unitPlugin ]
})
```


## Example
Using the above example code:

#### Input
```javascript
{
  marginTop: 0,
  width: 25,
  lineHeight: 1.4,
  height: '53',
  fontSize: 15,
  margin: 10
}
```
#### Output
```javascript
{
  marginTop: 0,
  width: '25em',
  lineHeight: 1.4,
  height: '53em',
  fontSize: '15pt',
  margin: '10%'
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Commons License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](http://weser.io) and all the great contributors.
