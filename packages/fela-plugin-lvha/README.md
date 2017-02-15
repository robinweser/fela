# fela-plugin-lvha


<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-lvha.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.50kb-brightgreen.svg">

LVHA (sometimes known as LVHFA) stands for **L**ink **V**isited **H**over (**F**ocus) **A**ctive which are actually describe pseudo classes. Within CSS their order is relevant which means we always need to sort them correctly. This plugin **does** include the `:focus` pseudo class as well.

## Installation
```sh
npm i --save fela-plugin-lvha
```
Assuming you are using [npm](https://www.npmjs.com) as your package manager you can just `npm install`.<br>
Otherwise we also provide a [UMD](https://github.com/umdjs/umd). You can easily use it via [unpkg](https://unpkg.com/). It registers a `FelaPluginLVHA` global.
```HTML
<!-- Fela (Development): Unminified version including all warnings -->
<script src="https://unpkg.com/fela-plugin-lvha@4.2.3/dist/fela-plugin-lvha.js"></script>
<!-- Fela (Production): Minified version -->
<script src="https://unpkg.com/fela-plugin-lvha@4.2.3/dist/fela-plugin-lvha.min.js"></script>
```

## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import LVHA from 'fela-plugin-lvha'

const renderer = createRenderer({
  plugins: [ LVHA() ]
})
```

## Example
#### Input
```javascript
{
  width: '25px',
  ':hover': {
    color: 'red'
  },
  ':visited': {
    color: 'gray'
  }
  ':link': {
    margin: 0
  }
}
```
#### Output
```javascript
{
  width: '25px',
  ':link': {
    margin: 0
  },
  ':visited': {
    color: 'gray'
  },
  ':hover': {
    color: 'red'
  }
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
