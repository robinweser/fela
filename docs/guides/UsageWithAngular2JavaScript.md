# Usage with Angular 2 and JavaScript

Fela was always designed with React in mind, but is **not** bound to React by default. 
To use it with Angular 2 and JavaScript you just need to install the normal Fela library.

## Example Project

You can checkout the **Angular 2 example project** and run it like so:

```sh
git clone https://github.com/rofrischmann/fela.git
cd fela/examples/angular2/javascript
npm install
npm run start
```

The **Code Level of the example is ES6**.


## Configure Fela in your Angular 2 Project

:red_circle: The code examples are based on the build-chain as used in [Angular 2 ESNext TodoMVC](https://github.com/blacksonic/angular2-esnext-todomvc).
 
### 1. Install Fela Library
 
```sh
npm i --save fela

```

### X. Appendix
 
We extended the build chain by the following. You do not need to do anything, we just wanted to mention,
 that we needed to configure **babel-plugin-transform-class-properties** to make fela work with ES6 Angular 2.

```sh
npm i --save-dev babel-plugin-transform-class-properties
```

`.babelrc`

```
{
 "presets": ["es2015", "angular2"],
  "plugins": ["transform-class-properties"]
}
```

