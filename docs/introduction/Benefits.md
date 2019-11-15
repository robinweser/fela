# Benefits

#### 1. Universal Rendering
Fela was designed to be capable of universal rendering (client- and server-side rendering) from the very beginning. The renderer, which is the core of Fela, ships with universal rendering capabilities that can be utilized by both the DOM renderer and the server renderer to ship a seamless universal rendering experience.

#### 2. Local Namespace
Each rule is transformed into unique CSS classes by design. Hence there is no chance of any conflicts due to the global namespace.

#### 3. Dead Code Elimination
Fela only adds styles to the markup that have actively been rendered. Unused style declarations are left out by default.

#### 4. Framework-agnostic
In contrast to many other JavaScript-based styling solutions, Fela is not tied to any framework or library. It has been designed with [React](https://facebook.github.io/react/) in mind, but can be used as a stand-alone solution or with any other framework. We do provide [bindings](https://github.com/robinweser/fela/tree/master/packages/react-fela) for React though.

#### 5. Minimal Markup Size
Fela uses atomic class design to enable minimal markup size. That means, every single declaration e.g. `color: red` is transformed into a unique CSS class. This enables modular style reuse on declaration basis. In general, the more styles are rendered, the more duplicate declarations it contains.

#### 6. High Performance
Atomic class design also enables super fast rendering. Rendered declarations get cached and can therefore be reused immediately. Additionally, there are several performance benefits by rendering styles with JavaScript. First of all, CSS is only generated and attached as it is needed. Also, it uses single class selectors which are among the fastest CSS selectors available.<br>
Check the [css-in-js-perf-tests](https://github.com/hellofresh/css-in-js-perf-tests#results) repository for benchmark results.
Also check out [css-in-js-app](https://tuchk4.github.io/css-in-js-app/#/react-fela) for DOM rendering benchmark and comparison.

#### 7. No Global State
Contrary to many other JavaScript styling solutions, Fela does not use any global state. All the magic happens only inside the renderer instance.
