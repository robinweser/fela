# fela-codemods

<a href="https://bundlephobia.com/result?p=fela-codemods@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/fela-codemods.svg"></a>

Automatic Codemods to migrate your Fela code to newer versions using [jscodeshift](https://github.com/facebook/jscodeshift).

## Installation
```sh
yarn add fela-codemods
```
You may alternatively use `npm i --save fela-codemods`.


## Usage
First of all, we need to have [jscodeshift](https://github.com/facebook/jscodeshift) installed globally.

```sh
yarn global add jscodeshift
```
You may alternatively use `npm i -g jscodeshift`.


Now transforming our codebase is as simple as using the [jscodeshift CLI](https://github.com/facebook/jscodeshift#usage-cli).<br>

```sh
jscodeshift -t node_modules/fela-codemods/src/{codemod} [path]
```
where `codemod` is the actual codemod file that should be used and `path` is either a single file or a directory.

## Available Codemods
The following list shows all available codemods for different version migrations.<br>
In order to use all codemods for a specific version at once, we use `index` as our `codemod` value.

### Table of Contents
- [v10](#10)
  - [FelaComponent](#fela-component)
  - [FelaTheme](#fela-theme)
  - [RendererProvider](#renderer-provider)

## v10
### FelaComponent

| Packages | Codemod | 
| --- | --- | 
| react-fela<br>inferno-fela<br>preact-fela | `v10/FelaComponent.js` |

Renames the `rule` prop to `style` and transforms all `style` as a function of `theme` to a function of `props`.<br>
Also transforms the `render` prop to either `as` or `children` respectively.

<details>
<summary>Before</summary>

```javascript
const Usage = (
  <FelaComponent rule={({ color }) => ({ fontSize: 15, color })} />
)
```
```javascript
const Usage = (
  <FelaComponent style={theme => ({ color: theme.primary })} />
)
```
```javascript
const Usage = (
  <FelaComponent render="div">Hello</FelaComponent>
)
```
```javascript
const Usage = (
  <FelaComponent render={({ className }) => <div className={className}>Hello</div>} />
)
```


</details>
<details>
<summary>After</summary>

```javascript
const Usage = (
  <FelaComponent style={({ color }) => ({ fontSize: 15, color })} />
)
```
```javascript
const Usage = (
  <FelaComponent style={({ theme }) => ({ color: theme.primary })} />
)
```
```javascript
const Usage = (
  <FelaComponent as="div">Hello</FelaComponent>
)
```
```javascript
const Usage = (
  <FelaComponent>{({ className }) => <div className={className}>Hello</div>}</FelaComponent>
)
```

</details>

--- 

### FelaTheme
| Packages | Codemod |
| --- | --- |
| react-fela<br>inferno-fela<br>preact-fela | `v10/FelaTheme.js` | 

Refactors using the `render` prop to use the `children` special prop instead.

<details>
<summary>Before</summary>

```javascript
const Usage = (
  <FelaTheme render={theme => <div>{theme.color.primary}</div>} />
)
```

</details>
<details>
<summary>After</summary>

```javascript
const Usage = (
  <FelaTheme>{theme => <div>{theme.color.primary}</div>}</FelaTheme>
)
```
</details>

---

### RendererProvider

| Packages | Codemod |
| --- | --- |
| react-fela<br>inferno-fela<br>preact-fela | `v10/RendererProvider.js` | 

Renames all usages of `Provider` to `RendererProvider`. Also works for named imports.

<details>
<summary>Before</summary>

```javascript
import { Provider } from 'react-fela'

const Usage = (
  <Provider renderer={renderer}>
    <App />
  </Provider>
)
```
```javascript
import { Provider as FelaProvider } from 'react-fela'

const Usage = (
  <FelaProvider renderer={renderer}>
    <App />
  </FelaProvider>
)
```

</details>
<details>
<summary>After</summary>

```javascript
import { RendererProvider } from 'react-fela'

const Usage = (
  <RendererProvider renderer={renderer}>
    <App />
  </RendererProvider>
)
```
```javascript
import { RendererProvider as FelaProvider } from 'react-fela'

const Usage = (
  <FelaProvider renderer={renderer}>
    <App />
  </FelaProvider>
)
```
</details>

## Example
```sh
# applies all version 10 codemods to all .js files in src
jscodeshift -t node_modules/fela-codemods/src/v10/index.js src

# applies the version 10 FelaComponent codemod to all .js files in src
jscodeshift -t node_modules/fela-codemods/src/v10/FelaComponent.js src
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
