# Monolithic Class Names

Using atomic class names design for developing can be quite hard to debug so we support monolithic class names.
Atomic class names will give you `n` number of classes when you `renderer.renderRule` while monolithic design will give you one class name with all the rules. By default, the class names are based on properties (it's a simple hash function). If you want to fix the class name, you can add property `className` into your rule set. This can be useful if you want to generate an external stylesheet that's human readable, deterministic and can be used on non-JS projects.

Simply include the [Fela Monolithic Enhancer](https://github.com/rofrischmann/fela/tree/master/packages/fela-monolithic).

```javascript
import monolithic from 'fela-monolithic'

const config = {
  enhancers: [ monolithic() ]
}

const renderer = createRenderer(config)
```
