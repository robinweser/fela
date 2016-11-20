# fela-plugin-custom-property


<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-custom-property.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.42kb-brightgreen.svg">

Sometimes it's handy to define some custom properties mostly used as shortcuts.

A custom property basically is just a plain function that takes a value as input and outputs an object of style declarations.

## Installation
```sh
npm i --save fela-plugin-custom-property
```
Assuming you are using [npm](https://www.npmjs.com) as your package mananger you can just `npm install`.<br>
Otherwise we also provide a [UMD](https://github.com/umdjs/umd). You can easily use it via [unpkg](https://unpkg.com/). It registers a `FelaPluginCustomProperty` global.
```HTML
<!-- Fela (Development): Unminified version including all warnings -->
<script src="https://unpkg.com/fela-plugin-custom-property@3.0.7/dist/fela-plugin-custom-property.js"></script>
<!-- Fela (Production): Minified version -->
<script src="https://unpkg.com/fela-plugin-custom-property@3.0.7/dist/fela-plugin-custom-property.min.js"></script>
```

## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import customProperty from 'fela-plugin-custom-property'

const renderer = createRenderer({
  plugins: [ customProperty() ]
})
```

### Configuration
In order to get custom properties resolved, you need to configure the plugin with all custom properties once.

```javascript
import { createRenderer } from 'fela'
import customProperty from 'fela-plugin-custom-property'

const sizeProperty = size => ({
  width: size + 'px',
  height: size + 'px'
})

const customPropertyPlugin = customProperty({
  // the key defines the used CSS property
  // the value references the resolving function
  size: sizeProperty
})

const renderer = createRenderer({
  plugins: [ customPropertyPlugin ]
})
```

## Example
Let's say we want to have a custom property `size` that accepts a single number which will then be transformed into both `width` and `height` with a `px` unit applied.

#### Input
```javascript
{
  size: 25
}
```
#### Output
```javascript
{
  width: '25px',
  height: '25px'
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
