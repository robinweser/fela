# StyleSheet
Organize multiple Fela Rules in StyleSheets.
A simple helper to organize multiple rules within one single StyleSheet as used e.g. in [React Native](https://github.com/facebook/react-native) or [react-look](https://github.com/rofrischmann/react-look).

## Methods
* [`create(styles)`](#createstyles)

---

### `create(styles)`
Transforms a set of either style objects or rules into a set of valid rules.
#### Arguments
1. `styles` (*Object?*): An object containing either plain style objects or valid [rules](http://fela.js.org/docs/basics/Rules.html).

#### Returns
(*Object*): An object containing only valid [rules](http://fela.js.org/docs/basics/Rules.html). It uses the same keys which were passed by `styles`.

#### Example
```javascript
import { createRenderer } from 'fela'
import { StyleSheet } from 'fela-tools'

const rules = StyleSheet.create({
  header: props => ({
    fontSize: props.size,
    color: 'red'
  }),
  // plain style objects will get
  // converted to rules by default
  title: {
    fontSize: '12px',
    lineHeight: 1.2
  }
})

const renderer = createRenderer()

renderer.renderRule(rules.header, { fontSize: '17px' })
renderer.renderRule(rules.title)
```
