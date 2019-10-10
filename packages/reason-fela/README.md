# Reason Fela

<img alt="npm version" src="https://badge.fury.io/js/reason-fela.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/reason-fela.svg"> <a href="https://bundlephobia.com/result?p=reason-fela@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/reason-fela.svg"></a>

Official [Reason](http://reasonml.github.io) bindings for Fela and React Fela.<br />
It provides an [Css](https://github.com/astrada/bs-css-core) module which was forked from [bs-css](https://github.com/SentiaAnalytics/bs-css) for a more convenient style editing experience.

> **Note**: These bindings are still quite young and might change slightly. If you want to use older APIs such as `createComponent` or `connect`, we recommend using [bs-react-fela](https://github.com/astrada/bs-react-fela).

## Installation
```sh
yarn add reason-fela

# you'll also need at least fela and react-fela
yarn add fela react-fela
```
In your `bsconfig.json`, include `"reason-fela"` in the bs-dependencies.

## Usage

### Creating a Fela renderer
```reason
open Fela;

// you can also use all plugins and enhancers via Fela.Plugins and Fela.Enhancers
let renderer = Renderer.make(
  RendererConfig.make(
    ~plugins=Presets.web,
    ~selectorPrefix="reason-",
    ()
  )
)
```

### Passing the Renderer

```reason
open Fela;
open ReactFela;

let renderer = Renderer.make(
  RendererConfig.make(~plugins=Presets.web, ())
)

// we can optionally also pass a theme
let theme = {
  "colors": {
    "primary": Css.blue,
    "secondary": Css.red
  }
};

[@react.component]
let make = (~children) => 
  <RendererProvider renderer>
    <ThemeProvider theme>
      children
    </ThemeProvider>
  </RendererProvider>
```

### Using the Hooks

```reason
open Fela;
open ReactFela;

// we also open the Css module for convenience
open Fela.Css;

[@react.component]
let make = (~children) => {
  let css = useFela();
  let theme = useTheme();
  let renderer = useRenderer();

  // we can also do stuff we the renderer
  renderer##renderStatic(style([backgroundColor(black)]), "body")

  <div className={css(style([fontSize(pt(18)), color(theme##colors##primary)]))}>
    {"I'm red" |> React.string}
  </div>
}
```

### Server-side Rendering
```reason
open Fela;
open Fela.Dom;

let htmlString = renderToMarkup(renderer);
let sheetList = renderToSheetList(renderer);

sheetList -> Belt.Array.forEach(({type_, css, media, support, rehydration}) => {
  // render your style nodes here
});
```




## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
