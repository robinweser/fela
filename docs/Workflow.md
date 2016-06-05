# Rendering Workflow

Both Renderers use a cache to memorize rendered styles in order to reuse them every time the same style is rendered again. This prevents duplication and improves performance on future rendering cycles. It also prevents unnecessary DOM manipulations.
<br>
The Renderer therefore always has an up-to-date version of all rendered styles during the whole application lifetime which can be rendered to a DOM node or a string at any given time.


## Handler
Every render-call is evaluated by a render handler which delegates next steps depending on the input. The following sections will describe the rendering flow for each input type.

* [Selector](#selector)
* [Keyframe](#keyframe)
* [FontFace](#fontface)
* [Static Style](#staticstyle)

### Selector
Selectors should build up at least 80% of your styles. They have the most complicated, but well optimized, rendering flow as they have to go through several steps until they finally get rendered to CSS. We will use a basic example selector, similar to the one used in the README to demonstrate the process step by step.

```javascript
const selector = props => ({
  fontSize: props.fontSize + 'px',
  marginTop: props.margin ? '15px' : 0,
  color: 'red',
  boxSizing: 'border-box',
  ':hover': {
    color: 'blue',
    fontSize: props.fontSize + 2 + 'px'
  },
  '@media (min-height: 300px)': {
    backgroundColor: 'gray',
    marginTop: props.margin ? '30px': 0,
    ':hover': {
      color: props.color
    }
  }
})
```

#### 1. Resolving & Processing

First of all the selector gets resolved with *props* passed to the Renderer. Not passing props will automatically inject an empty object as *props*. The resolved style object then gets piped through the defined set of plugins, which are used to process and alter the style *e.g. by adding vendor prefixes*.
Let's assume we're using the [prefixer](plugins/Prefixer.md) plugin along with `{margin: true, fontSize: 12}` as *props*.

```javascript
const style = {
  fontSize: '12px',
  marginTop: '15px',
  color: 'red',
  boxSizing: 'border-box',
  MozBoxSizing: 'border-box',
  ':hover': {
    color: 'blue',
    fontSize: '24px'
  },
  '@media (min-height: 300px)': {
    backgroundColor: 'gray',
    marginTop: '30px',
    ':hover': {
      color: undefined
    }
  }
}
```

#### 2. Validation

Next the resolved and processed style object gets validated in order to remove any invalid properties which would produce invalid CSS markup. It removes properties with arrays, functions and objects as values. The only exceptions to the removal of object values are pseudo class and media query properties, if their values are not empty objects. String values containing `undefined` will also get removed.<br>
This step is especially important if no props are passed, as all dynamic values will remain either `undefined` or contain `undefined` as a string.

```javascript
const style = {
  fontSize: '12px',
  marginTop: '15px',
  color: 'red',
  boxSizing: 'border-box',
  MozBoxSizing: 'border-box',
  ':hover': {
    color: 'blue',
    fontSize: '24px'
  },
  '@media (min-height: 300px)': {
    backgroundColor: 'gray',
    marginTop: '30px'
  }
}
```

#### 3. Dynamic style extraction, Cssifying & Caching
Last but not least the style objects get transformed to valid CSS rulesets (including pseudo class rulesets) using a unique className generated from an unique reference ID as well as a content-based hash of the passed *props*, which makes it unique throughout the whole application.<br>
During this process only dynamic styles are actually used which is achieved by diffing the styles against the static style subset. The static style subset is immediately rendered the first time a selector is rendered itself. Using the above example, the static subset would be:
```javascript
const subset = {
  color: 'red',
  boxSizing: 'border-box',
  MozBoxSizing: 'border-box'
  ':hover': {
    color: 'blue'
  },
  '@media (min-height: 300px)': {
    backgroundColor: 'gray'
  }
}
```
The extracted dynamic subset then gets transformed into valid CSS and added to the cache. The markup which is finally mounted to the DOM would thus be the following (beautified for better readability):

```CSS
.c0 {
  color: red;
  box-sizing: border-box;
  -moz-box-sizing:border-box
}

.c0:hover {
  color: blue
}

.c0-foo {
  font-size: 12px;
  margin-top: 15px
}

.c0-foo:hover {
  font-size: 24px;
}

@media (min-height: 300px) {
  .c0 {
    background-color: gray
  }

  .c0-foo {
    margin-top: 30px
  }
}
```

### Keyframe
Similar to selectors Keyframes are also instantiated using a pure function of props. Therefore they're undergoing a similar rendering process, albeit not as complicated.
We will use the following Keyframe to demonstrate the process:

```javascript
const keyframe = new Fela.Keyframe(props => {
  from: {
    fontSize: props.fontSize,
    color: 'blue'
  },
  to: {
    fontSize: props.fontSize + 5,
    color: props.color,
    backgroundColor: 'black'
  }
})
```

#### 1. Resolving & Processing
First of all the Keyframe gets resolved using the provided *props*. The resolved frame object then gets processed by piping it through each plugin as well. Let's assume we're using the [unit](plugins/Unit.md) plugin along with `{fontSize: 12}` as *props*.

```javascript
const frames = {
  from: {
    fontSize: '12px',
    color: 'blue'
  },
  to: {
    fontSize: '17px',
    color: undefined,
    backgroundColor: 'black'
  }
})
```

#### 2. Validation
Again, similar to selector validation, all invalid properties will now be removed from the frame object. This time we're removing arrays, functions, `undefined` + strings including `undefined` and **all** objects except the first level (`from`, `to`).

```javascript
const frames = {
  from: {
    fontSize: '12px',
    color: 'blue'
  },
  to: {
    fontSize: '17px',
    backgroundColor: 'black'
  }
})
```

#### 3. Cssifying & Caching
As keyframe animations can **not** be split into static and dynamic subsets to be reused wisely, we do not have to do that additional step. Also they are actually already clustered by frame percentage values which is why we can skip that one as well.<br>
So finally we just need to transform the frames to valid CSS frames using an unique animationName generated similar to a selectors className. It also adds prefixed keyframes.<br>
The resulting CSS markup gets cached to be reused as well.
```CSS
@-webkit-keyframes k0-bar {
  from {
    font-size: 12px;
    color: blue
  }

  to {
    font-size: 17px;
    background-color: black
  }
}

@-moz-keyframes k0-bar {
  from {
    font-size: 12px;
    color: blue
  }

  to {
    font-size: 17px;
    background-color: black
  }
}

@keyframes k0-bar {
  from {
    font-size: 12px;
    color: blue
  }

  to {
    font-size: 17px;
    background-color: black
  }
}
```

### FontFace
Font faces are rather simple to be rendered as there is nothing one would change dynamically. They just get transformed into valid CSS and cached. The only step is the validation which evaluates the font formats as well as the applied font properties.<br>
To demonstrate we will use the follow example:
```javascript
const files = [
  '../font/Arial.ttf',
  '../font/Arial.woff'
]

const properties = {
  fontWeight: 300,
  fontSize: '12px'
}

const fontFace = new Fela.FontFace('Arial', files, properties)
```

#### 1. Validation
Validation will remove the `fontSize: 12px` as it is not a [valid @font-face property](api/Fela.md##fontfacefamily-files--properties). The files also get validated according their font format.

#### 2. Cssifying & Caching
FontFaces get cached to prevent duplication.
The rendered CSS markup therefore is:
```CSS
@font-face {
  font-family: 'Arial';
  src: url('../font/Arial.ttf') format('truetype'),
       url('../font/Arial.woff') format('woff');
  font-weight: 300
}
```

### Static style
To be completed soon.
