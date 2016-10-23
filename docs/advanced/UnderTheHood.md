# Under The Hood

This section is all about how Fela works under the hood. Focusing on how rules are rendered and cached.

### Rendering Mechanism
Below is an abstract flow chart of what happens after the `Renderer.renderRule` method is called. *(see Image 1)*
> **Note**: A similar process is used to render keyframes, fonts and static styles, but with some steps skipped.

![Rendering Mechanism](../../res/RenderingMechanism.png)
*(Image 1: Rendering Mechanism - `Renderer.renderRule`)*

Basically the first task is to check if the rule has already been used before (and therefore has the static subset already calculated). If not, it automatically calls `renderRule` with an empty props object. This way, every dynamic property gets stripped off and only the static subset remains. This is required to do the style diffing later.<br>
After rendering the static subset, it takes the passed props and generates a hash string. The hash is used as a reference in the cache. If it already exists, we can simply return the className, which is built off an unique ID for each rule and the generated hash. *(Static subsets do not have the hash postfix)* e.g. `c0 c0-foo` where `c0` is the static subset and `c0-foo` the dynamic part.
<br>
If this specific pair of rule and props has not been rendered before, the actual rendering takes part. It consists of the following four steps:

1. **Resolving**:<br>Simply calls the rule which is a function by passing the props as parameter. It returns a style object with all dynamic values injected.

2. **Processing**:<br>The style object gets piped through each plugin to perform style processing such as adding vendor prefixes or applying units.

3. **Diffing**:<br>The fully processed style object now gets diffed against the prior rendered static subset to only extract dynamic properties

4. **Transformation**:<br>Finally the extracted dynamic styles gets transformed into a single valid CSS string

Afterwards the styles get added to the cache and the previously generated className gets returned.<br>
In a final step the changes get emitted notifying each listener. For example, the DOM renderer `Fela.render` subscribes to changes to be able to immediately update the stylesheet.

### Caching mechanism
In order to perform fast style rendering, Fela uses a cache to safe and reuse rendered styles. There are several different information that get cached:

1. **Static string caches**<br>
There are five static string caches in total. They all keep a single static CSS string to do quick `Renderer.renderToString` calls. Each cache keeps rendered style strings in rendering order. They cover `fontFaces`, `keyframes`, `statics`, `rules` and `mediaRules`.

2. **Rendered style cache**<br>
Another cache tracks every rendered ruleset. It is an object where the key references the unique selector and the value is a boolean. If the value is `true`, the rendered selector is not empty. If it's `false` the selector is empty and does not need to be applied.

3. **Static subset cache**<br>
The static subset cache is used to cache the static subset of each rule. The static subset can later be used to do style diffing to extract dynamic styles.

4. **Rule reference cache**<br>
This cache is used to assign ids to each unique rule. The id is then used to generate a unique className.

#### Example
Let's say we have a new renderer with nothing cached at all. We then perform the following rendering calls.
```javascript
import { createRenderer } from 'fela'

const renderer = createRenderer()

const rule = props => ({
  fontSize: '15px',
  lineHeight: 1.2,
  color: props.color,
  '@media (min-height: 300px)': {
    backgroundColor: props.bgColor,
    color: 'black'
  }
})

renderer.renderStatic('body,html{margin:0;padding:0}')
renderer.renderStatic({
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box'
}, 'div')

renderer.renderRule(rule) // => c0
renderer.renderRule(rule, { color: 'blue', backgroundColor: 'red' }) // => c0-foo
```
The cache will look like the following afterwards:
```javascript
{
  fontFaces: '',
  keyframe: '',
  statics: 'body,html{margin:0;padding:0}div{display:flex;flex-direction:column;box-sizing:border-box}',
  rules: '.c0{font-size:15px;line-height:1.2}.c0-foo{color:blue}',
  mediaRules: {
    '(min-height: 300px)': '.c0{color:black}.c0-foo{background-color:red}'
  },
  rendered: {
    'body,html{margin:0;padding:0}': true,
    'divboxSizingborder-boxdisplayflexflexDirectioncolumn': true,
    'c0': true,
    'c0-foo': true
  },
  base: {
    0: {
      fontSize: '15px',
      lineHeight: 1.2,
      '@media (min-height: 300px)': {
        color: 'black'
      }
    }
  },
  ids: [ rule ]
}
```

### String Rendering
String rendering is very important in terms of server-side rendering. We want to be able to render the whole amount of rendered styles into a single string to inject them directly on server-side. This way we can ship prerendered CSS.<br>
This happens using Fela's `Renderer.renderToString`-method which returns the exact CSS string at any given point of time. The output is simply generated by concatenating all **static string caches** (see [Caching Mechanism - 1. Static string caches](#caching-mechanism)).

It is done in the following order:
1. Fonts
2. Static Styles
3. Rules
4. Media Query Rules (clustered)
5. Keyframes
