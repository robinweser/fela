# fela-monolithic

<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-monolithic.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-1.22kb-brightgreen.svg">

The monolithic enhancer will use unique class names instead of atomic ones.
These generated class names are not re-usable like the atomic design but allows you to debug and modify styles with ease.
Every ruleset will have it's own unique class - this means that a new class will be generated if you are using props and they change. If you want to fix the class name, you can add property `className` into your rule set. This can be useful if you want to generate an external stylesheet that's human readable, re-usable and can be used on non-JS projects.

## Installation
```sh
npm i --save fela-monolithic
```
Assuming you are using [npm](https://www.npmjs.com) as your package manager you can just `npm install`.<br>
Otherwise we also provide a [UMD](https://github.com/umdjs/umd). You can easily use it via [unpkg](https://unpkg.com/). It registers a `FelaMonolithic` global.
```HTML
<!-- Fela (Development): Unminified version including all warnings -->
<script src="https://unpkg.com/fela-monolithic@4.3.1/dist/fela-monolithic.js"></script>
<!-- Fela (Production): Minified version -->
<script src="https://unpkg.com/fela-monolithic@4.3.1/dist/fela-monolithic.min.js"></script>
```

## Usage
```javascript
import { createRenderer } from 'fela'
import monolithic from 'fela-monolithic'

const renderer = createRenderer({
  enhancers: [ monolithic() ]
})

const rule = () => ({
  className: 'custom',
  color: 'red'
})

renderer.renderRule(rule)
```

outputs

```css
.fela-custom {
  color: red
}
```

if `className` property is not used, the output will be

```css
.fela-137u7ef {
  color: red
}
```

`137u7ef` is a hash based on rule properties (`color: red` in this case). The prefix `fela` can be configured in createRenderer.

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
