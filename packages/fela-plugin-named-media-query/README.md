# fela-plugin-named-media-query


<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-named-media-query.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.49kb-brightgreen.svg">

This plugin is basically a convenient plugin for more readable code and better maintenance.<br>
It enables the use of named media query keys.

## Installation
```sh
npm i --save fela-plugin-named-media-query
```
Assuming you are using [npm](https://www.npmjs.com) as your package manager you can just `npm install`.<br>
Otherwise we also provide a [UMD](https://github.com/umdjs/umd). You can easily use it via [unpkg](https://unpkg.com/). It registers a `FelaPluginNamedMediaQuery` global.
```HTML
<!-- Fela (Development): Unminified version including all warnings -->
<script src="https://unpkg.com/fela-plugin-named-media-query@4.3.2/dist/fela-plugin-named-media-query.js"></script>
<!-- Fela (Production): Minified version -->
<script src="https://unpkg.com/fela-plugin-named-media-query@4.3.2/dist/fela-plugin-named-media-query.min.js"></script>
```

## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import namedMediaQuery from 'fela-plugin-named-media-query'

const renderer = createRenderer({
  plugins: [ namedMediaQuery() ]
})
```

### Configuration
##### Parameters
| Parameter | Value | Default | Description |
| --- | --- | --- | --- |
| mediaQueryMap | *(Object)* | `{}` | An object with shorthand-mediaQuery pairs |

##### Example
```javascript
import { createRenderer } from 'fela'
import namedMediaQuery from 'fela-plugin-named-media-query'

const namedMediaQueryPlugin = namedMediaQuery({
  desktop: '@media (min-width: 1024px)',
  tablet: '@media (min-width: 768px)'
})

const renderer = createRenderer({
  plugins: [ namedMediaQueryPlugin ]
})
```

## Example
Using the above example code:

#### Input
```javascript
{
  color: 'red',
  desktop: {
    color: 'blue'
  }
}
```
#### Output
```javascript
{
  color: 'red',
  '@media (min-width: 1024px)': {
    color: 'blue'
  }
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
