# fela-stylesheet


<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-stylesheet.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.40kb-brightgreen.svg">

A simple helper to organize multiple rules within one single StyleSheet. It automatically transforms plain style objects into rules.

## Installation
```sh
npm i --save fela-stylesheet
```
Assuming you are using [npm](https://www.npmjs.com) as your package mananger you can just `npm install`.<br>
Otherwise we also provide a [UMD](https://github.com/umdjs/umd). You can easily use it via [npmcdn](https://npmcdn.com/). It registers a  `FelaStyleSheet` global.
```HTML
<!-- Fela (Development): Unminified version including all warnings -->
<script src="https://npmcdn.com/fela-stylesheety@1.0.1/dist/fela-stylesheet.js"></script>
<!-- Fela (Production): Minified version -->
<script src="https://npmcdn.com/fela-stylesheet@1.0.1/dist/fela-stylesheet.min.js"></script>
```

## Example

```javascript
import { createRenderer } from 'fela'
import StyleSheet from 'fela-stylesheet'

const styles = StyleSheet.create({
  header: props => ({
    fontSize: props.size,
    color: 'red'
  }),
  title: {
    fontSize: '12px',
    lineHeight: 1.2
  }
})

const renderer = createRenderer()

renderer.renderRule(header, { fontSize: '17px' })
renderer.renderRule(title)
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
