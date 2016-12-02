# fela-stylesheet


<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-stylesheet.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.37kb-brightgreen.svg">

Organize multiple Fela Rules in StyleSheets.
A simple helper to organize multiple rules within one single StyleSheet as used e.g. in [React Native](https://github.com/facebook/react-native) or [react-look](https://github.com/rofrischmann/react-look).

## Installation
```sh
npm i --save fela-stylesheet
```
Assuming you are using [npm](https://www.npmjs.com) as your package mananger you can just `npm install`.<br>
Otherwise we also provide a [UMD](https://github.com/umdjs/umd). You can easily use it via [unpkg](https://unpkg.com/). It registers a  `FelaStyleSheet` global.
```HTML
<!-- (Development) Unminified version -->
<script src="https://unpkg.com/fela-stylesheety@4.0.1/dist/fela-stylesheet.js"></script>
<!-- (Production) Minified version -->
<script src="https://unpkg.com/fela-stylesheet@4.0.1/dist/fela-stylesheet.min.js"></script>
```

## API

### `create(styles)`
Transforms a set of either style objects or rules into a set of valid rules.
#### Arguments
1. `styles` (*Object?*): An object containing either plain style objects or valid [rules](http://fela.js.org/docs/basics/Rules.html).

#### Returns
(*Object*): An object containing only valid [rules](http://fela.js.org/docs/basics/Rules.html). It uses the same keys which were passed by `styles`.

#### Example
```javascript
import { createRenderer } from 'fela'
import { create } from 'fela-stylesheet'

const rules = create({
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

renderer.renderRule(rules.header, { fontSize: '17px' })
renderer.renderRule(rules.title)
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
