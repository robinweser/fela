# Examples

Often the best way to learn something, is to learn from examples.
While we do not provide much examples yet, we highly appreciate any help to provide some useful examples.

## Vanilla
A basic vanilla JavaScript example. It uses ECMAScript 5 and UMD builds of the Fela packages. No build step required.
```sh
git clone https://github.com/rofrischmann/fela.git

cd fela/examples/vanilla
open index.html
```

#### Covers
* Rules
* Keyframes
* Statics
* Plugins

## React
A simple example application using the [React bindings](https://github.com/rofrischmann/react-fela).

```sh
git clone https://github.com/rofrischmann/fela.git

cd fela/examples/react
# starts the universal rendered application at localhost:8080
npm start

# starts the client-side application at localhost:8080
npm run client
```

#### Covers
* Rules
* Keyframes
* Fonts
* Static Styles
* React Bindings
* Dynamic Rules
* Plugins
* Server-side Rendering


## Inferno
A simple example application using the [Inferno bindings](https://github.com/rofrischmann/inferno-fela).
It is basically the same examples as the React example and therefore also covers the same topics.<br>
Sadly some features are not yet perfectly working with Inferno which we believe have to do with the [`babel-plugin-inferno`](https://github.com/trueadm/babel-plugin-inferno). Manually testing all features without JSX was working greatly.

```sh
git clone https://github.com/rofrischmann/fela.git

cd fela/examples/inferno
# starts the universal rendered application at localhost:8080
npm start

# starts the client-side application at localhost:8080
npm run client
```

## Angular 2

See the following documentation:

 * [Usage with Angular 2 TypeScript](../guides/UsageWithAngular2TypeScript.md)
 * [Usage with Angular 2 JavaScript](../guides/UsageWithAngular2JavaScript.md)
