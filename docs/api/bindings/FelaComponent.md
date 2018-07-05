# FelaComponent

FelaComponent is an alternative component to the [createComponent](createComponent.md)-HoC leveraging the render-props pattern. It uses [FelaTheme](FelaTheme.md) internally in order to access the theme directly.

## Props

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| customClass | string | class(es) to prepend before the generated classes |
| style | [*StyleObject*](../../basics/Rules.md#styleobject)<br>*Function*| | Either a valid style object or a function of `theme` |
| rule | *Function*| | A function of `theme` and props|
| render | *string?*<br>*Function* | `div` | Either a render function or a string primitive to render into.<br>If passing a render function is receives the specified render interface. |

#### Render Interface
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | *string* | | The class names for the rendered *style* object |
| theme | *Object* | `{}` | The theme object which is passed down via context |

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
  }}
  render={({ className, theme }) => (
    <div className={className}>I am red on blue.</div>
  )}
/>
```

#### Generic Components
In order to create dynamically styled components using props, just like [createComponent](createComponent.md), we can create a component that itself renders a FelaComponent.

```javascript
const Button = ({ color, big = false, text }) => (
  <FelaComponent
    style={{
      backgroundColor: color,
      fontSize: big ? 18 : 15
    }}
    render={({ className }) => (
      <button className={className}>{text}</button>
    )}
  />
)
```

#### Using Theme
To access theme properties, we can simply pass a function of theme.

```javascript
<FelaComponent
  style={theme => ({
    backgroundColor: theme.bgPrimary,
    color: 'red'
  })}
  render={({ className, theme }) => (
    <div className={className}>I am red on {theme.bgPrimary}.</div>
  )}
/>
```

#### Style Rule as a Function of Props and Theme
Sometimes it is desirable to style a component as a function of both theme and
props. The `rule` prop takes a callback, and passes it an object with `theme`
and all props passed to FelaComponent except "style", "render" and "rule".

This provides an API that is both compatible with createComponent, and allows
using an externally defined function in such use cases. Hopefully, this can
be help performance in hot paths by not requiring a function to be created on
every render.


```javascript
const ruleFunction = ({ theme, bgc }) => ({
  backgroundColor: bgc || 'red',
  color: theme.bgPrimary,
})

<FelaComponent
  bgc='blue',
  rule={ruleFunction}
  render={({ className, theme }) => (
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
  render='span'
>
  I am red on blue
</FelaComponent>
```

#### Add Custom Classes
The common use case of needing to add a custom class to the generated ones, e.g.
for integration with 3rd party libraries, can be handled using the `customClass`
prop.

```javascript
<FelaComponent
  customClass="my-custom-class"
  style={{ color: 'red' }}
>
  I am red and have a custom class
</FelaComponent>
// <div class="my-custom-class a">
//  I am red and have a custom class
// </div>
```