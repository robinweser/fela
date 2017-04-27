# Testing Fela Components

There is no required library for testing Fela components. Since Fela is [framework-agnostic](../introduction/Benefits.md), you may use any javascript testing library to test your components. Fela's source is already [fully tested](https://codeclimate.com/github/rofrischmann/fela/coverage), so your tests should only confirm that Fela's styles are interacting correctly with the components.

## Approach

#### Testing the Renderer
The [`renderer`](../basics/Renderer.md) is only responsible for _inserting the styles into the application_ and _providing your components a reference the styles_. Therefore, our tests should ensure these two responsibilities work correctly with our components.

#### Testing Rules
[Rules are just pure functions](../basics/Rules.md). Eric Elliot, a respected Javascript instructor in the industry, [defines pure functions for us](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976).

> A pure function is a function which: 

> - Given the same input, will always return the same output.
> - Produces no side effects.
> - Relies on no external mutable state.

Since our rules will follow this definition, our tests can simply ensure our rules _output the correct styles for every input._

## Implemenation

We will use Jest in the following examples, but since any testing library can be used to test Fela components, feel free to apply the approaches above to the library that best suites you.

#### React


