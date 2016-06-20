# Principles
### 1. Styles are pure functions of your application state

Modern UI libraries such as [React](https://facebook.github.io/react/) provide neat APIs to implement the very basic concept of component-based views. [Lee Byron](https://github.com/leebyron) used to describe components, during his [Render 2016](https://vimeo.com/166790294) presentation, as the following:

> "The current state of things goes in and a representation of what you want on the screen comes out."

```javascript
(state) => view
```

This simple concept allows us to compose multiple components into a complex and dynamic UI while always keeping what is displayed in sync with our application state.<br>
Yet a component does not only describe **which** information is displayed, but also **how** it is displayed. In general we use CSS to style our components by creating static selectors that again define a fixed set of style declarations. This approach totally works fine as long as you have static a UI which only updates its displayed data, but does not suit dynamic a UI which alters its appearance depending on data it receives.<br>
**If the view is a function of state, your CSS should be too**, as it is part of your view.

```javascript
(state) => style
```

Your styles are not just a static style declarations anymore. They can automatically adjust themselves to fit the displayed information at any point of time.<br>
We call the relevant parts of the state properties, usually referred to as **props**.

```javascript
const rule = props => ({
  fontSize: props.size + 'px',
  color: 'blue',
  lineHeight: props.lineHeight,
  display: 'flex'
})
```
