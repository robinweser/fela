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
npm install
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

## React Native
A simple example application using the [React bindings](https://github.com/rofrischmann/react-fela) and the [React Native renderer](http://fela.js.org/docs/guides/UsageWithReactNative.html#native-renderer).

```sh
git clone https://github.com/rofrischmann/fela.git

cd fela/examples/react-native
npm install
npm start
```

Afterwards open one of the platform specific native projects and run with a simulator.

#### Covers
* React Native
* Rules
* React Bindings
* Dynamic Rules
* Plugins

## Angular 2
The code examples are based on the build-chain as used in [Angular 2 ESNext TodoMVC](https://github.com/blacksonic/angular2-esnext-todomvc).

```sh
git clone https://github.com/rofrischmann/fela.git
cd fela/examples/angular2/javascript
npm install
npm run start
```

#### Covers
* Rules
* Angular Service
* Dynamic Rules

### TypeScript
The same example is also available in TypeScript. It also covers Fela typings.
```sh
git clone https://github.com/rofrischmann/fela.git
cd fela/examples/angular2/typescript
npm install
npm run start
```

## Inferno
A simple example application using the [Inferno bindings](https://github.com/rofrischmann/inferno-fela).
It is basically the same examples as the React example and therefore also covers the same topics.<br>
Sadly some features are not yet perfectly working with Inferno which we believe have to do with the [`babel-plugin-inferno`](https://github.com/trueadm/babel-plugin-inferno). Manually testing all features without JSX was working greatly.

```sh
git clone https://github.com/rofrischmann/fela.git

cd fela/examples/inferno
npm install
# starts the universal rendered application at localhost:8080
npm start

# starts the client-side application at localhost:8080
npm run client
```
