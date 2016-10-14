# fela-plugin-debug-layout


<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-debug-layout.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.49kb-brightgreen.svg">

Adds either colored outlines or a almost transparent background color to debug the application layout.<br>
Same rules will always have the same color.

## Installation
```sh
npm i --save fela-plugin-debug-layout
```
Assuming you are using [npm](https://www.npmjs.com) as your package mananger you can just `npm install`.<br>
Otherwise we also provide a [UMD](https://github.com/umdjs/umd). You can easily use it via [unpkg](https://unpkg.com/). It registers a `FelaPluginDebugLayout` global.
```HTML
<!-- Fela (Development): Unminified version including all warnings -->
<script src="https://unpkg.com/fela-plugin-debug-layout@3.0.1/dist/fela-plugin-debug-layout.js"></script>
<!-- Fela (Production): Minified version -->
<script src="https://unpkg.com/fela-plugin-debug-layout@3.0.1/dist/fela-plugin-debug-layout.min.js"></script>
```

## Example
#### background-mode
![Preview Background](preview-background.png)

#### outline-mode
![Preview Outline](preview-outline.png)



## Configuration
The debug layout plugin uses two different option flags.

```javascript
import debugLayout from 'fela-plugin-debug-layout'

const plugin = debugLayout({
  // will use the background color module
  // instead of the outline mode
  backgroundColor: true,
  // defines the outline thickness
  // if using the outline mode
  thickness: 1
})
```


## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
