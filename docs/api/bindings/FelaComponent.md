# FelaComponent

FelaComponent is an alternative component to the [createComponent](createComponent.md)-HoC leveraging the render-props pattern. It uses [FelaTheme](FelaTheme.md) internally in order to access the theme directly.

## Props

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| style | [*Rule*](../../basics/Rules.md)<br>[*StyleObject*](../../basics/Rules.md#styleobject)<br>*Array\<[*Rule*](../../basics/Rules.md)\|[*StyleObject*](../../basics/Rules.md#styleobject)\>*| | Either a valid style object, and [rule](../../basics/Rules.md) or an array of both |
| children | *any* |  | Either a render function or a primitive child.<br>If passing a render function is receives the specified render interface. |
| as | *string* | `div` | If children is passed a primitive child, the component will render an `as`-type DOM element with the className attached and the primitive child as content.

#### Deprecated Props 
> The following props are deprecated and will be removed in the next major version (11.0.0).

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| customClass |	string	| | class(es) to prepend before the generated classes	|
|rule	| *Function*	| |	A function of theme and props |

### Render Interface
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | *string* | | The class names for the rendered *style* object |
| children |	*Element* |	| The component children | 
| theme | *Object* | `{}` | The theme object which is passed down via context |
| as | *string* | `div` | The `as` property that is passed to the component |

## Imports
```javascript
import { FelaComponent } from 'react-fela'
import { FelaComponent } from 'preact-fela'
import { FelaComponent } from 'inferno-fela'
```

## Example
```javascript
<FelaComponent
  style={{
    backgroundColor: 'blue',
    color: 'red'
  }}>
  {({ className, theme }) => (
    <div className={className}>I am red on blue.</div>
  )}
</FelaComponent>
```

#### Generic Components
In order to create dynamically styled components using props, just like [createComponent](createComponent.md), we can create a component that itself renders a FelaComponent.

```javascript
const Button = ({ color, big = false, text }) => (
  <FelaComponent
    style={{
      backgroundColor: color,
      fontSize: big ? 18 : 15
    }}>
    {({ className }) => (
      <button className={className}>{text}</button>
    )}
  </FelaComponent>
)
```

#### Using Theme
To access theme properties, we can simply pass a function of theme.

```javascript
const style = ({ theme }) => ({
  backgroundColor: theme.bgPrimary,
  color: 'red'
})

<FelaComponent style={rule}>
  {({ className, theme }) => (
    <div className={className}>I am red on {theme.bgPrimary}.</div>
  )}
/>
```

#### Style Rule as a Function of Props and Theme
Sometimes it is desirable to style a component as a function of both theme and
props. The `style` prop takes a callback, and passes it an object with `theme`
and all props passed to FelaComponent except *style* and *children*.

This provides an API that is both compatible with createComponent, and allows
using an externally defined function in such use cases. Hopefully, this can
be help performance in hot paths by not requiring a function to be created on
every render.


```javascript
const rule = ({ theme, bgc }) => ({
  backgroundColor: bgc || 'red',
  color: theme.bgPrimary,
})

<FelaComponent bgc='blue' style={rule}>
  {({ className, theme }) => (
    <div className={className}>I am {theme.bgPrimary} on {bgc || 'red'}.</div>
  )}
/>
```

#### Shorthand Primitives
Instead of a render function, we can also specify a primitive element to render into.<br>
Children will automatically be passed down. If not specified at all, it will render into a `div`.

```javascript
<FelaComponent
  style={{
    backgroundColor: 'blue',
    color: 'red'
  }}
  as='span'
>
  I am red on blue
</FelaComponent>
```

#### Composition
In order to compose multiple FelaComponents we can't just concatenate classNames as they might overwrite each other due to the atomic CSS design and specificity.<br>
We have to use a built-in API to correctly combine those rules and styles: [combineRules](../fela/combineRules.md).

With FelaComponent we can leverage that API automatically by passing an array to the *style* prop.

```javascript
const baseStyle = {
  backgroundColor: 'red',
  fontSize: 15
}

const Button = ({ style, ...props }) => (
  <FelaComponent style={[baseStyle, style]} {...props} as="button" />
)

const ExtendedButton = ({ style, children }) => (
  <Button style={{ color: 'blue' }}>Click</Button>
)
```

The array accepts both style objects, rule functions and even nested arrays again.