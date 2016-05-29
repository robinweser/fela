# Rendering mechanism

Both Renderer use some kind of cache to memorize rendered selectors in order to reuse them every time the same *selector variation* is rendered again. A selector variation is considered a pair of the used *props* and the rendered styles output. This prevent duplication and improves performance on future rendering cycles. It also prevents unnecessary DOM manipulations.
<br>
The Renderer therefore always has an up-to-date version of all rendered styles during the whole application lifetime which can be rendered to a DOM node or a string at any given time.


## Unique classNames
Each time a selector is rendered the Renderer generates a reference className which is returned to be used within the application. The className is generated from a unique selector reference ID as well as a content-based hash of the passed props what makes it unique throughout the whole application.

## Caching
To reduce redundant rendering cycles every rendered selector variation will get cached and reused for future render-calls. This also boosts performance of runtime rendering as a huge amount of variations can be reused and are therefore not rendered nor mounted to the DOM node again.

## Reusing static styles
As most selectors also include static style declarations that can not be transformed by any kind of props passed there are several duplications if multiple selectors are rendered side-by-side. To reuse those styles, the Renderer will automatically render the static styles by passing empty props on initial Selector render.
All future dynamic variations will be diffed with the static styles to only render dynamic declarations. Therefore every render-call will also return the static className in addition to the dynamic one.

#### Example
```javascript
const selector = props => ({
  color: props.color,
  fontSize: '14px',
  backgroundColor: 'blue',
  lineHeight: 2.3,
  ':hover': {
    color: 'black',
    fontSize: props.size
  }
})

renderer.render(selector, { color: 'red '}) // => c0 c0-dwzf4
renderer.render(selector, { size: '23px' }) // => c0 c0-rw8qs
```

##### Rendered CSS
```CSS
.c0 {
  font-size: 14px;
  background-color: blue;
  line-height: 2.3
}

.c0:hover {
  color: black
}

.c0-dwzf4 {
  color: red
}

.c0-rw8qs:hover {
  font-size: 23px
}
```
