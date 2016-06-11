# Benefits

#### 1. Universal Rendering
Fela was designed to be capable of universal rendering (server-side rendering) from the very beginning. The Renderer class which is the core of Fela ships with a simple `renderToString`-method which allows to get a valid CSS string of all rendered styles at any time. The DOM Renderer was not designed as the base, but rather as an extension to the universal Renderer.

#### 2. Local Namespace
Each rule is locally scoped with a reference ID which is always unique by design. Hence there is no chance of any conflicts due to the global namespace.

#### 3. Dead Code Elimination
Fela only adds styles to your CSS that have actively been rendered. Unused style declarations are left out by default.

#### 4. Framework-agnostic
In contrast to many other JavaScript-based styling solutions, Fela is not tied to any framework or library. In fact it has been designed with [React](https://facebook.github.io/react/) in mind, but can be used as a stand-alone solution though we also provide [bindings](https://github.com/rofrischmann/react-fela) for React.

#### 5. Minimal Markup
Fela uses a special diffing mechanism to extract dynamic styles on the fly. It allows us to reuse all static style declarations in order to produce as little CSS markup as possible.
