declare module "inferno-fela" {

  import * as Inferno from "inferno";
  import {
    IRenderer,
    TRule,
    TRuleProps,
    IStyle
  } from "fela";
  import {
    TMultiRuleObject,
    TMultiRule,
    TPartialMultiRule,
  } from "fela-tools";

  type Style<Props> = TRule<Props> | IStyle;

  type PassThroughFunction<Props> = (props: Props) => Array<string>
  type PassThroughProps<Props> = Array<string> | PassThroughFunction<Props>;

  export type Rules<Props, Styles> = TMultiRuleObject<Props, Styles>

  interface FelaWithThemeProps<Theme> {
    innerRef?: (instance: any) => void,
    theme: Theme,
  }

  export interface FelaWithStylesProps<Props, Styles, Theme = any> {
    styles: {[key in keyof Styles]: string},
    rules: {[key in keyof Styles]: TRule<Props & Partial<FelaWithThemeProps<Theme>>>},
  }

  interface FelaWithStylesInjectedProps<Props, Styles, Theme = any> {
    extend?: TPartialMultiRule<Props & FelaWithThemeProps<Theme>, Styles>
  }

  interface FelaInjectedProps<Props, Theme = any> {
    theme?: Theme;
    as?: string | Inferno.ComponentType<Props>;
    passThrough?: PassThroughProps<Props>;
    innerRef?: (instance: any) => void;
    extend?: Style<Props>;
  }

  interface HTMLProps<T> extends _InfernoJSX.ClassAttributes<T>, _InfernoJSX.AllHTMLAttributes<T> {}

  type FelaHtmlComponent<Props, Elem, Theme = any> =
    Inferno.ComponentType<Props & FelaInjectedProps<Props, Theme> & HTMLProps<Elem>>;

  type FelaSvgComponent<Props, Elem extends SVGElement, Theme = any> =
    Inferno.ComponentType<Props & FelaInjectedProps<Props, Theme> & _InfernoJSX.SVGAttributes<Elem>>;

  type DefaultFelaHtmlComponent<Props, Theme = any> =
    FelaHtmlComponent<Props, HTMLDivElement, Theme>;

  /**
   * connect()
   */

  interface ConnectConfigParams {
    pure?: boolean;
  }

  interface ConnectedWithRules<Props, Styles, Theme = any> {
    (Component: Inferno.ComponentType<FelaWithStylesProps<Props, Styles, Theme> & Props>)
      : Inferno.ComponentType<Props & FelaWithStylesInjectedProps<Props, Styles, Theme>>
  }

  export function connect<Props, Styles, Theme = any>(
    rules: TMultiRule<Props & FelaWithThemeProps<Theme>, Styles>,
    config?: ConnectConfigParams
  ): Inferno.Component<Props, {}>;

  /**
   * createComponent()
   */

  export function createComponent<Props, Theme = any>(
    rule: Style<Props>,
    passThroughProps?: PassThroughProps<Props>
  ): DefaultFelaHtmlComponent<Props, Theme>;

  export function createComponent<Props, Elem extends HTMLElement, Theme = any>(
    rule: Style<Props>,
    type: string,
    passThroughProps?: PassThroughProps<Props>
  ): FelaHtmlComponent<Props, Elem, Theme>;

  export function createComponent<Props, BaseProps, Elem extends HTMLElement, Theme = any>(
    rule: Style<Props>,
    type: FelaHtmlComponent<BaseProps, Elem>,
    passThroughProps?: PassThroughProps<Props>
  ): FelaHtmlComponent<BaseProps & Props, Elem, Theme>;

  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "a", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLAnchorElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "abbr", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "address", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "area", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLAreaElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "article", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "aside", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "audio", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLAudioElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "b", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "base", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLBaseElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "bdi", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "bdo", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "big", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "blockquote", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "body", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLBodyElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "br", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLBRElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "button", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLButtonElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "canvas", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLCanvasElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "caption", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "cite", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "code", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "col", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableColElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "colgroup", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableColElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "data", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "datalist", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLDataListElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "dd", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "del", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "details", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "dfn", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "dialog", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "div", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLDivElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "dl", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLDListElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "dt", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "em", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "embed", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLEmbedElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "fieldset", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLFieldSetElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "figcaption", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "figure", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "footer", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "form", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLFormElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "h1", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadingElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "h2", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadingElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "h3", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadingElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "h4", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadingElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "h5", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadingElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "h6", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadingElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "head", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "header", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "hgroup", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "hr", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHRElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "html", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHtmlElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "i", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "iframe", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLIFrameElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "img", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLImageElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "input", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLInputElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "ins", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLModElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "kbd", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "keygen", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "label", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLLabelElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "legend", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLLegendElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "li", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLLIElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "link", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLLinkElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "main", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "map", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLMapElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "mark", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "menu", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "menuitem", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "meta", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLMetaElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "meter", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "nav", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "noindex", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "noscript", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "object", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLObjectElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "ol", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLOListElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "optgroup", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLOptGroupElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "option", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLOptionElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "output", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "p", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLParagraphElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "param", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLParamElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "picture", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLPictureElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "pre", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLPreElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "progress", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLProgressElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "q", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLQuoteElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "rp", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "rt", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "ruby", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "s", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "samp", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "script", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "section", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "select", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLSelectElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "small", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "source", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLSourceElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "span", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLSpanElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "strong", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "style", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLStyleElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "sub", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "summary", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "sup", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "table", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "tbody", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableSectionElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "td", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableDataCellElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "textarea", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTextAreaElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "tfoot", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableSectionElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "th", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableHeaderCellElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "thead", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableSectionElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "time", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "title", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTitleElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "tr", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableRowElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "track", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTrackElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "u", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "ul", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLUListElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "var", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "video", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLVideoElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "wbr", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;

  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "svg", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "circle", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "clipPath", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "defs", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "desc", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "ellipse", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "feBlend", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "feColorMatrix", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "feComponentTransfer", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "feComposite", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "feConvolveMatrix", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "feDiffuseLighting", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "feDisplacementMap", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "feDistantLight", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "feFlood", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "feFuncA", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "feFuncB", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "feFuncG", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "feFuncR", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "feGaussianBlur", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "feImage", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "feMerge", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "feMergeNode", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "feMorphology", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "feOffset", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "fePointLight", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "feSpecularLighting", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "feSpotLight", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "feTile", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "feTurbulence", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "filter", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "foreignObject", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "g", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "image", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "line", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "linearGradient", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "marker", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "mask", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "metadata", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "path", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "pattern", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "polygon", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "polyline", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "radialGradient", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "rect", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "stop", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "switch", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "symbol", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "text", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "textPath", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "tspan", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "use", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(rule: Style<Props>, type: "view", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;

  /**
   * createComponentWithProxy()
   */

  export function createComponentWithProxy<Props, Theme = any>(
    rule: Style<Props>,
    passThroughProps?: PassThroughProps<Props>
  ): DefaultFelaHtmlComponent<Props, Theme>;

  export function createComponentWithProxy<Props, Elem extends HTMLElement, Theme = any>(
    rule: Style<Props>,
    type: string,
    passThroughProps?: PassThroughProps<Props>
  ): FelaHtmlComponent<Props, Elem, Theme>;

  export function createComponentWithProxy<Props, BaseProps, Elem extends HTMLElement, Theme = any>(
    rule: Style<Props>,
    type: FelaHtmlComponent<BaseProps, Elem>,
    passThroughProps?: PassThroughProps<Props>
  ): FelaHtmlComponent<BaseProps & Props, Elem, Theme>;

  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "a", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLAnchorElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "abbr", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "address", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "area", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLAreaElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "article", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "aside", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "audio", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLAudioElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "b", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "base", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLBaseElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "bdi", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "bdo", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "big", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "blockquote", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "body", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLBodyElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "br", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLBRElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "button", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLButtonElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "canvas", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLCanvasElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "caption", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "cite", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "code", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "col", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableColElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "colgroup", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableColElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "data", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "datalist", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLDataListElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "dd", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "del", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "details", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "dfn", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "dialog", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "div", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLDivElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "dl", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLDListElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "dt", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "em", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "embed", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLEmbedElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "fieldset", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLFieldSetElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "figcaption", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "figure", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "footer", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "form", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLFormElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "h1", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadingElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "h2", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadingElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "h3", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadingElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "h4", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadingElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "h5", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadingElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "h6", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadingElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "head", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "header", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "hgroup", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "hr", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHRElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "html", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHtmlElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "i", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "iframe", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLIFrameElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "img", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLImageElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "input", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLInputElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "ins", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLModElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "kbd", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "keygen", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "label", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLLabelElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "legend", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLLegendElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "li", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLLIElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "link", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLLinkElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "main", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "map", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLMapElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "mark", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "menu", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "menuitem", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "meta", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLMetaElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "meter", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "nav", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "noindex", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "noscript", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "object", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLObjectElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "ol", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLOListElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "optgroup", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLOptGroupElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "option", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLOptionElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "output", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "p", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLParagraphElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "param", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLParamElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "picture", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLPictureElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "pre", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLPreElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "progress", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLProgressElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "q", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLQuoteElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "rp", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "rt", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "ruby", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "s", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "samp", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "script", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "section", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "select", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLSelectElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "small", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "source", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLSourceElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "span", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLSpanElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "strong", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "style", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLStyleElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "sub", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "summary", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "sup", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "table", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "tbody", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableSectionElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "td", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableDataCellElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "textarea", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTextAreaElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "tfoot", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableSectionElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "th", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableHeaderCellElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "thead", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableSectionElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "time", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "title", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTitleElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "tr", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableRowElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "track", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTrackElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "u", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "ul", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLUListElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "var", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "video", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLVideoElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "wbr", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;

  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "svg", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "circle", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "clipPath", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "defs", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "desc", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "ellipse", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "feBlend", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "feColorMatrix", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "feComponentTransfer", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "feComposite", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "feConvolveMatrix", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "feDiffuseLighting", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "feDisplacementMap", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "feDistantLight", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "feFlood", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "feFuncA", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "feFuncB", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "feFuncG", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "feFuncR", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "feGaussianBlur", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "feImage", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "feMerge", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "feMergeNode", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "feMorphology", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "feOffset", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "fePointLight", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "feSpecularLighting", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "feSpotLight", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "feTile", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "feTurbulence", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "filter", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "foreignObject", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "g", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "image", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "line", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "linearGradient", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "marker", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "mask", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "metadata", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "path", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "pattern", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "polygon", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "polyline", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "radialGradient", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "rect", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "stop", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "switch", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "symbol", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "text", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "textPath", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "tspan", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "use", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponentWithProxy<Props, Theme = any>(rule: Style<Props>, type: "view", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;

  /**
   * TODO: FelaComponent
   */

  export class FelaComponent {
    className: string;
    theme: object;
  }

  /**
   * TODO: FelaTheme Component
   */

  export class FelaTheme { }

  /**
   * Provider Component
   */

  interface ProviderProps {
    renderer: IRenderer;
  }

  export class Provider extends Inferno.Component<ProviderProps, {}> { }

  /**
   * ThemeProvider Component
   */

  interface ThemeProviderProps {
    theme: object;
    overwrite?: boolean;
  }

  export class ThemeProvider extends Inferno.Component<ThemeProviderProps, {}> { }

  /**
   * withTheme()
   */

  export function withTheme<Props, Theme>(
    component: Inferno.ComponentType<FelaWithThemeProps<Theme> & Props>,
    propName?: string
  ): Inferno.ComponentType<Props>;

  export function fe (): Function;

}
