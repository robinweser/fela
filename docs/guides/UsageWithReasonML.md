
# Usage with ReasonML

The Reason bindings ship with some core Fela APIs, React hooks and all plugins, enhancers and presets.

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

/* you can also use all plugins and enhancers via Fela.Plugins and Fela.Enhancers
   e.g. Fela.Plugins.prefixer, Fela.Enhancers.web */
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
open ReactFela;

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
open ReactFela;

[@react.component]
let make = (~children) => {
  let css = useFela();
  let theme = useTheme();
  let renderer = useRenderer();

  /* we can also do stuff we the renderer */
  renderer##renderStatic(Fela.style({"backgroundColor": "red"}), "body");

  <div
    className={css([
      Fela.style({"fontSize": "18pt", "color": theme##colors##primary}),
    )]}>
    "I'm red"->React.string
  </div>;
};
```

### Convenience Hooks
ReactFela also includes two convenience hooks `useFela1` and `useFela2` that take just 1 or 2 parameters respectively instead of passing a list.

```reason 
open ReactFela;

[@react.component]
let make = (~children) => {
  let css1 = useFela1();
  let css2 = useFela2();

  <div className={css1(Fela.style({"color": "red"}))}>
    <div
      className={css2(
        Fela.style({"color": "red"}),
        Fela.style({"color": "red"}),
      )}
    />
  </div>;
};
```

## Server-side Rendering

If we're running a universal app, we also want to make sure that styles are correctly rendered and rehydrated when doing server-side rendering.<br>
Therefore, reason-fela also provides bindings to fela-dom.

```reason
open Fela.Dom;

let htmlString = renderToMarkup(renderer);
let sheetList = renderToSheetList(renderer);

sheetList -> Belt.Array.forEach(({type_, css, media, support, rehydration}) => {
  /* render your style nodes here */
});
```

## Using bs-css-core

You can also opt-in [bs-css-core](https://github.com/astrada/bs-css-core) module which was forked from [bs-css](https://github.com/SentiaAnalytics/bs-css) for a more convenient, type-safe API.


```sh
yarn add @astrada/bs-css-core
```
In your `bsconfig.json`, include `"@astrada/bs-css-core"` in the `bs-dependencies`.

Now the only thing we need is a type converter which can be done using the `"%identity"` helper. You probably want to create a new utility mode e.g. `FelaUtils` that looks sth. like this:

```reason
external fromBsCssCore: Css.style => Fela.style = "%identity";
```

Now we can use it in our components:

```reason
open ReactFela;
open FelaUtils;
open Css;

[@react.component]
let make = (~children) => {
  let css = useFela();
  let theme = useTheme();
  let renderer = useRenderer();

  /* we can also do stuff we the renderer */
  renderer##renderStatic(
    fromBsCssCore(style([backgroundColor(black)])),
    "body",
  );
  <div
    className={css([
      fromBsCssCore(
        style([fontSize(pt(18)), color(theme##colors##primary)]),
      ),
    ])}>
    "I'm red"->React.string
  </div>;
};
```