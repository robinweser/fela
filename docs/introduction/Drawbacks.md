# Drawbacks

Like every solution, also Fela is not **the** ultimate solution and should not be blindly used without evaluating its benefits and disadvantages. The strict design decisions also have some drawbacks.

#### 1. Computed Selectors
The unique computed selectors are quite handy as they [prevent namespacing conflicts](Benefits.md#local-namespace). But they are not designed to be human-readable nor to be mutated at all. This can be a problem especially if you need to overwrite them which often is the case e.g. if you provide a customizable UI library. There are options such as using inline styles or add the `!important` flag to each declaration, but that again is not an optimal solution either.
