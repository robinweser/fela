# fela-plugin-debug-layout


<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-debug-layout.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.50kb-brightgreen.svg">

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
<script src="https://unpkg.com/fela-plugin-debug-layout@4.0.0/dist/fela-plugin-debug-layout.js"></script>
<!-- Fela (Production): Minified version -->
<script src="https://unpkg.com/fela-plugin-debug-layout@4.0.0/dist/fela-plugin-debug-layout.min.js"></script>
```

## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import debugLayout from 'fela-plugin-debug-layout'

const renderer = createRenderer({
  plugins: [ debugLayout() ]
})
```


### Configuration
##### Options
| Option | Value | Default | Description |
| --- | --- | --- | --- |
| `mode` | `outline`, `backgroundColor` | `outline` | sets the debug mode |
| `thickness` | *(number)* | `1` | outline thickness for `outline` mode |

##### Example
```javascript
import { createRenderer } from 'fela'
import debugLayout from 'fela-plugin-debug-layout'

const debugLayoutPlugin = debugLayout({
  mode: 'outline',
  thickness: 4
})

const renderer = createRenderer({
  plugins: [ debugLayoutPlugin ]
})
```

## Example
#### background-mode
![Preview Background](preview-background.png)

#### outline-mode
![Preview Outline](preview-outline.png)


## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
