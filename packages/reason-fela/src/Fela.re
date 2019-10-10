module BsCssCore = Css;

module Css = {
  include BsCssCore;
};

type plugin;

type renderer = {. "renderStatic": (Css.style, string) => unit};
type enhancer = renderer => renderer;

open Css;
module RendererConfig = {
  type t = {
    .
    "plugins": array(plugin),
    "enhancers": array(enhancer),
    "keyframePrefixes": array(string),
    "mediaQueryOrder": array(string),
    "supportQueryOrder": array(string),
    "filterClassName": string => bool,
    "selectorPrefix": string,
    "devMode": bool,
  };

  // TODO: improve, don't use default values
  let make =
      (
        ~selectorPrefix="",
        ~keyframePrefixes=[|"-webkit-", "-moz-"|],
        ~mediaQueryOrder=[||],
        ~supportQueryOrder=[||],
        ~filterClassName=cls => Js.String.includes("ad", cls),
        ~plugins=[||],
        ~enhancers=[||],
        ~devMode=false,
        (),
      ) => {
    "plugins": plugins,
    "enhancers": enhancers,
    "selectorPrefix": selectorPrefix,
    "devMode": devMode,
    "keyframePrefixes": keyframePrefixes,
    "supportQueryOrder": supportQueryOrder,
    "mediaQueryOrder": mediaQueryOrder,
    "filterClassName": filterClassName,
  };
};

module Renderer = {
  [@bs.module "fela"]
  external make: RendererConfig.t => Js.t('a) = "createRenderer";
};

[@bs.module "fela"]
external combineRules: list(style) => style = "combineRules";

module Dom = {
  type sheet = {
    type_: string,
    css: string,
    media: string,
    support: bool,
    rehydration: int,
  };

  [@bs.module "fela-dom"]
  external renderToMarkup: renderer => string = "renderToMarkup";

  [@bs.module "fela-dom"] external render: renderer => unit = "render";

  [@bs.module "fela-dom"] external rehydrate: renderer => unit = "rehydrate";

  [@bs.module "fela-dom"]
  external renderToSheetList: renderer => array(sheet) = "renderToSheetList";
};

module Plugins = {
  // TODO: more type-safe input (rtl and ltr)
  [@bs.module "fela-plugin-bidi"] external bidi: string => plugin = "default";

  [@bs.module "fela-plugin-custom-property"]
  external customProperty: Js.t('a) => plugin = "default";

  [@bs.module "fela-plugin-embedded"]
  external embedded: unit => plugin = "default";

  [@bs.module "fela-plugin-expand-shorthand"]
  external expandShorthand: bool => plugin = "default";

  [@bs.module "fela-plugin-extend"]
  external extend: unit => plugin = "default";

  [@bs.module "fela-plugin-fallback-value"]
  external fallbackValue: unit => plugin = "default";

  [@bs.module "fela-plugin-named-keys"]
  external namedKeys: Js.t('a) => plugin = "default";

  [@bs.module "fela-plugin-placeholder-prefixer"]
  external placeholderPrefixer: unit => plugin = "default";

  [@bs.module "fela-plugin-prefixer"]
  external prefixer: unit => plugin = "default";

  // TODO: more type-safe input (rtl and ltr)
  [@bs.module "fela-plugin-rtl"] external rtl: string => plugin = "default";
  // TODO: how to improve that?
  // [@bs.module "fela-plugin-unit"]
  // external unit_: (string, Js.t('a), option(string => bool)) => plugin =
  //   "default";
  // let unit =
  //     (
  //       ~unit="px",
  //       ~unitPerProperty=Js.Obj.empty(),
  //       ~isUnitlessProperty=None,
  //     ) => {
  //   unit_(unit, unitPerProperty, isUnitlessProperty);
  // };
  // [@bs.module "fela-plugin-validator"]
  // external validator_: (bool, bool, bool) => plugin = "default";
  // let validator =
  //     (~logInvalid=true, ~deleteInvalid=false, ~useCSSLint=false) =>
  //   validator_(logInvalid, deleteInvalid, useCSSLint);
};

module Enhancers = {
  [@bs.module "fela-beautifier"]
  external beautifier: unit => enhancer = "default";

  // TODO: improve input
  [@bs.module "fela-layout-debugger"]
  external layoutDebugger: Js.t('a) => enhancer = "default";

  // TODO: improve input
  [@bs.module "fela-logger"]
  external logger: Js.t('a) => enhancer = "default";

  [@bs.module "fela-monolithic"]
  external monolithic: unit => enhancer = "default";

  [@bs.module "fela-perf"] external perf: unit => enhancer = "default";

  [@bs.module "fela-sort-classnames"]
  external sortClassnames: unit => enhancer = "default";

  [@bs.module "fela-statistics"]
  external statistics: unit => enhancer = "default";
};

module Presets = {
  [@bs.module "fela-preset-web"] external web: array(plugin) = "default";
  [@bs.module "fela-preset-dev"] external dev: array(plugin) = "default";
};