# Benefits

#### 1. Universal Rendering
Fela was designed to be capable of universal rendering (client- and server-side rendering) from the very beginning. The Renderer, which is the core of Fela, ships with a simple `renderToString` method which can return a valid CSS string of all rendered styles at any point in time. The DOM Renderer was not designed as the base, but rather as an extension to the universal Renderer.

#### 2. Local Namespace
Each rule is locally scoped with a reference ID which is always unique by design. Hence there is no chance of any conflicts due to the global namespace.

#### 3. Dead Code Elimination
Fela only adds styles to your CSS that have actively been rendered. Unused style declarations are left out by default.

#### 4. Framework-agnostic
In contrast to many other JavaScript-based styling solutions, Fela is not tied to any framework or library. It has been designed with [React](https://facebook.github.io/react/) in mind, but can be used as a stand-alone solution or with any other framework. We do provide [bindings](https://github.com/rofrischmann/react-fela) for React though.

#### 5. Minimal Markup Size
Fela uses a special diffing mechanism to extract dynamic styles on the fly. It enables reuse of all all static style declarations in order to produce as little CSS markup as possible.

#### 6. High Performance
Fela uses optimized rendering mechanisms to be high performant especially in production. Also there are several performance benefits rendering styles with JavaScript. First of all, CSS is only generated and attached as soon as it is needed. Every style gets cached to be reused and therefore is only rendered once at all by using a simple diffing algorithm. Last but not least it mostly uses single class selectors with are among the fastest CSS selectors available.
