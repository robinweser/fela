# Principles
## 1. Functions instead of objects
Most solutions, if not all, for handling styling in JavaScript use plain objects as styles. At first glance this makes total sense as styles basically are just a set of *property:value* pairs also known as rule declarations.<br>
But todays applications are everything except static pages. They evolve over time and change according to user interaction. Elements get rendered, removed, animated, reshaped, repositioned, recolored and transformed which also affects their styling. So why shouldn't styles behave the same?

#### Functional Selectors
Fela uses functions which are often referred as *selectors* to specify dynamic behavior of styles that can change over time. Most element changes can be measured with some kind of parameters which we call **props**.<br>
That's why every style composer basically is a function of *props* that returns a plain object containing style declarations.<br>
