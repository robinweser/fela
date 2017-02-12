# fela-plugin-unit


<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-unit.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-1.39kb-brightgreen.svg">

Always writing length values as string with a value applied seems not like the JavaScript way to do it. You can also use mathematics to process number values. <br>
It is aware of unitless properties such as `lineHeight` and also adds units to multiple values inside an array.

## Installation
```sh
npm i --save fela-plugin-unit
```
Assuming you are using [npm](https://www.npmjs.com) as your package manager you can just `npm install`.<br>
Otherwise we also provide a [UMD](https://github.com/umdjs/umd). You can easily use it via [unpkg](https://unpkg.com/). It registers a `FelaPluginUnit` global.
```HTML
<!-- Fela (Development): Unminified version including all warnings -->
<script src="https://unpkg.com/fela-plugin-unit@4.2.2/dist/fela-plugin-unit.js"></script>
<!-- Fela (Production): Minified version -->
<script  src="https://unpkg.com/fela-plugin-unit@4.2.2/dist/fela-plugin-unit.min.js"></script>
```


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
  width: '25em',
  lineHeight: 1.4,
  height: '53em',
  fontSize: '15pt',
  margin: '10%'
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
