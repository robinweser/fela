# fela-plugin-friendly-pseudo-class


<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-friendly-pseudo-class.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.52kb-brightgreen.svg">

Writing CSS pseudo classes within a plain JavaScript object sadly is sometimes painful as the default syntax is not really JavaScript-friendly.<br>

This plugins provides support for JavaScript-friendly pseudo class syntax with an `on`-prefix. e.g.

## Installation
```sh
npm i --save fela-plugin-friendly-pseudo-class
```
Assuming you are using [npm](https://www.npmjs.com) as your package manager you can just `npm install`.<br>
Otherwise we also provide a [UMD](https://github.com/umdjs/umd). You can easily use it via [unpkg](https://unpkg.com/). It registers a `FelaPluginFriendlyPseudoClass` global.
```HTML
<!-- Fela (Development): Unminified version including all warnings -->
<script src="https://unpkg.com/fela-plugin-friendly-pseudo-class@4.2.2/dist/fela-plugin-friendly-pseudo-class.js"></script>
<!-- Fela (Production): Minified version -->
<script src="https://unpkg.com/fela-plugin-friendly-pseudo-class@4.2.2/dist/fela-plugin-friendly-pseudo-class.min.js"></script>
```

## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import friendlyPseudoClass from 'fela-plugin-friendly-pseudo-class'

const renderer = createRenderer({
  plugins: [ friendlyPseudoClass() ]
})
```


## Example

#### Input
```javascript
{
  onHover: {
    color: 'red'
  }
}
```
#### Output
```javascript
{
  ':hover': {
    color: 'red'
  }
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
