
# Usage with ReasonML

The Reason bindings ship with some core Fela APIs, React hooks and all plugins, enhancers and presets.<br>
It also provides an [Css](https://github.com/astrada/bs-css-core) module which was forked from [bs-css](https://github.com/SentiaAnalytics/bs-css) for a more convenient style editing experience.

> **Note**: If you want to use older APIs such as `createComponent` or `connect`, we recommend using [bs-react-fela](https://github.com/astrada/bs-react-fela) instead.

```sh
yarn add reason-fela

# you'll also need at least fela and react-fela
yarn add fela react-fela
```
In your `bsconfig.json`, include `"reason-fela"` in the `bs-dependencies`.

## Creating a Fela renderer

First let's create our Fela renderer. We can pass all the [configs](http://fela.js.org/docs/advanced/RendererConfiguration.html) that the Fela renderer accepts.
```reason
open Fela;


// you can also use all plugins and enhancers via Fela.Plugins and Fela.Enhancers
// e.g. Fela.Plugins.prefixer, Fela.Enhancers.web
let renderer = Renderer.make(
  RendererConfig.make(
    ~plugins=Presets.web,
    ~selectorPrefix="reason-",
    ()
  )
)
```

## Passing the Renderer

Now that we have the renderer, we need to provide it to our app.<br>
We can also optionally pass a theme down here, which is useful for dynamic theming.<br>

> **Tip**: If we just want to define some static theme properties, one can also leverage a `Theme.re` module and access it directly due to all files/modules being globally available.

```reason
open Fela;
open ReactFela;

let renderer = Renderer.make(
  RendererConfig.make(~plugins=Presets.web, ())
)

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

## Using the Hooks

Now that our app is aware of the renderer, we can use the provided hooks in any component. The hooks are similar to react-fela's [useFela](http://fela.js.org/docs/api/bindings/useFela.html), but split into 3 different hooks for convenience.

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

## Server-side Rendering

If we're running a universal app, we also want to make sure that styles are correctly rendered and rehydrated when doing server-side rendering.<br>
Therefore, reason-fela also provides bindings to fela-dom.

```reason
open Fela;
open Fela.Dom;

let htmlString = renderToMarkup(renderer);
let sheetList = renderToSheetList(renderer);

sheetList -> Belt.Array.forEach(({type_, css, media, support, rehydration}) => {
  // render your style nodes here
});
```