# Principles
## 1. Functions instead of objects
Most solutions, if not all, for handling styling in JavaScript use plain objects as styles. At first glance this makes total sense as styles basically are just a set of *property:value* pairs also known as rule declarations.<br>
But todays applications are everything except static pages. They evolve over time and change according to user interaction. Elements get rendered, removed, animated, reshaped, repositioned, recolored and transformed which also affects their styling. So why shouldn't styles behave the same?

#### Functional selectors
Fela uses functions which are often referred as *selectors* to specify dynamic behavior of styles that can change over time. Most element changes can be measured with some kind of parameters which we call **props**.<br>
That's why every style composer basically is a function of *props* that returns a plain object containing style declarations.<br>

## 2. Middleware and Plugins
Fela was designed to be extended with Middleware and Plugins in order to keep the core package clean and small. Therefore everything that is not necessarily required to render selectors, keyframes or font-faces should be provided as middleware or as a rendering plugin.

#### Why both?
That's the point where you might have asked yourself: Why are there both - Middleware **and** Plugins? Both are used in a similar way to achieve different tasks. <br><br>
**Plugins** are used to process rendered styles. They take a *plugin interface* and return processed styles. <br>
Most plugins are build for use in production.<br><br>
**Middleware** on the other hand is mostly used to improve developer experience (DX) by providing handy developer tooling such as CSS formatting and Logging. They extend the renderer itself instead of processing the rendered styles. <br>
Most middleware is not designed to be used in production.
