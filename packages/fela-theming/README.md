# fela-theming

<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-theming.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.40kb-brightgreen.svg">

Adds theming support to Fela. Every theme property is available through an additional second argument for rules and keyframes. Static styles can be a function of the theme as well.

It can be used to provide universal theming such as coorporate identity.

> It was **not** build for component-based theming. We will have another tool to achieve this soon.

## Installation
```sh
npm i --save fela-theming
```
Assuming you are using [npm](https://www.npmjs.com) as your package mananger you can just `npm install`.<br>
Otherwise we also provide a [UMD](https://github.com/umdjs/umd). You can easily use it via [npmcdn](https://npmcdn.com/). It registers a  `FelaPerf` global.>
```HTML
<!-- Fela (Development): Unminified version including all warnings -->
<script src="https://npmcdn.com/fela-theming@1.1.0/dist/fela-theming.js"></script>
<!-- Fela (Production): Minified version -->
<script src="https://npmcdn.com/fela-theming@1.1.0/dist/fela-theming.min.js"></script>
```

## Usage
```javascript
import { createRenderer } from 'fela'
import theming from 'fela-theming'

const theme = {
  PRIMARY: 'red',
  SECONDARY: 'blue',
  styles: {
    button: {
      appearance: 'none',
      padding: 10
    }
  }
}

const renderer = createRenderer({
  enhancers: [ theming(theme) ]
})

// using the second argument
const rule = (props, theme) => ({
  ...theme.styles.button,
  color: theme.PRIMARY,
  fontSize: props.size
})

renderer.renderRule(rule, { size: '15px' }) // => c0 c0-foo
// .c0 { appearance: none; padding: 10; color: red }
// .c0-foo { font-size: 15px }
```

#### `updateTheme(theme)`
It also adds a new renderer method to update the theme at any time.

```javascript
const renderer = createRenderer({
  enhancers: [ theming({ color: 'red' }) ]
})

const ruleA = (props, theme) => ({ color: theme.color })
renderer.renderRule(ruleA) // => c0
// .c0 { color: red }

renderer.updateTheme({ color: 'blue' })

const ruleB = (props, theme) => ({ color: theme.color })
renderer.renderRule(ruleB) // => c1
// .c1 { color: blue }
```
> Note: `updateTheme` does not automatically update all previously rendered styles by default. To achieve retheming you would want to use another enhancer called [fela-rehydrate](https://github.com/rofrischmann/fela/blob/master/packages/fela-rehydrate/) and run `renderer.rehydrate()` afterwards to trigger style recalculation.

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
