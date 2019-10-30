[@bs.module "react-fela"] external useFela_: unit => Js.t('a) = "useFela";

let useFela = () => {
  let fela = useFela_();

  [@bs.variadic]
  let css = style => fela##css(Array.of_list(style));
  css;
};

let useFela1 = () => {
  let fela = useFela_();

  let css = style => fela##css(style);
  css;
};

let useFela2 = () => {
  let fela = useFela_();

  let css = (style1, style2) => fela##css(style1, style2);
  css;
};

let useTheme = () => {
  let fela = useFela_();
  fela##theme;
};

let useRenderer = () => {
  let fela = useFela_();
  fela##renderer;
};

module RendererProvider = {
  [@bs.module "react-fela"] [@react.component]
  external make:
    (~renderer: Fela.renderer, ~children: React.element) => React.element =
    "RendererProvider";
};

module ThemeProvider = {
  [@bs.module "react-fela"] [@react.component]
  external make: (~theme: Js.t('a), ~children: React.element) => React.element =
    "ThemeProvider";
};