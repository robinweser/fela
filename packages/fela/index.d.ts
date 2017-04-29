declare module "fela" {

  import { CSSProperties } from 'react';

  type TRuleProps = {};
  type TRule = (props: TRuleProps) => IStyle;
  type TKeyFrame = TRule;
  type TRendererCreator = (config?: IConfig) => IRenderer;
  type TPlugin = (style: IStyle) => IStyle; //http://fela.js.org/docs/advanced/Plugins.html
  type TEnhancer = (renderer: IRenderer) => IRenderer; //http://fela.js.org/docs/advanced/Enhancers.html

  const enum TSubscribeMessageType {
    rule = 1,
    staticObject = 1,
    keyframes = 2,
    fontFace = 3,
    staticString = 4,
    clear = 5
  }
  interface ISubscribeMessage {
    type: TSubscribeMessageType;
  }
  interface ISubscribeRuleOrStaticObjectMessage extends ISubscribeMessage { static?: boolean; declaration: string; selector: string; media: string; }
  interface ISubscribeKeyframesMessage extends ISubscribeMessage { name: string; keyframe: string; }
  interface ISubscribeFontFaceMessage extends ISubscribeMessage { fontFamily: string; fontFace: string; }
  interface ISubscribeStaticStringMessage extends ISubscribeMessage { css: string; }
  interface ISubscribeClearMessage extends ISubscribeMessage { }

  interface IRenderer {
    renderRule(rule: TRule, props: TRuleProps): string;
    renderKeyframe(keyFrame: TKeyFrame, props: TRuleProps): string;
    renderFont(family: string, files: Array<string>, props: TRuleProps): void;
    renderStatic(style: string, selector?: string): void;
    renderStatic(style: IStyle, selector: string): void;
    renderToString(): string;
    subscribe(event: (msg: ISubscribeRuleOrStaticObjectMessage | ISubscribeKeyframesMessage | ISubscribeFontFaceMessage | ISubscribeStaticStringMessage | ISubscribeClearMessage) => void): { unsubscribe: () => void; }
    clear(): void;
  }

  //http://fela.js.org/docs/advanced/RendererConfiguration.html
  interface IConfig {
    plugins?: Array<TPlugin>;
    keyframePrefixes?: Array<string>;
    enhancers?: Array<TEnhancer>;
    mediaQueryOrder?: Array<string>;
    selectorPrefix?: string;
  }

  interface IStyle extends CSSProperties {
    //TODO: add properties, missing in React.CSSProperties
  }

  function createRenderer(config?: IConfig): IRenderer;
  function combineRules(...rules: Array<TRule>): TRule;
  function enhance(...enhancers: Array<TEnhancer>): (rendererCreator: TRendererCreator) => TRendererCreator;
}

declare module "fela-dom" {
  import { IRenderer } from 'fela';
  function render(renderer: IRenderer, node: HTMLElement): any;
}

/**
 * ENHANCERS
 */
declare module "fela-beautifier" {
  import { TEnhancer } from "fela";

  export default function(): TEnhancer;
}

declare module "fela-font-renderer" {
  import { TEnhancer } from "fela";

  export default function(mountNode?: HTMLElement): TEnhancer;
}

declare module "fela-layout-debugger" {
  import { TEnhancer } from "fela";

  interface DebuggerOptions {
    mode?: "outline" | "backgroundColor";
    thickness?: number;
  }

  export default function(options: DebuggerOptions): TEnhancer;
}

declare module "fela-logger" {
  import { TEnhancer } from "fela";

  interface LoggerOptions {
    logCSS?: boolean;
    formatCSS?: boolean;
  }

  export default function(options: LoggerOptions): TEnhancer;
}

declare module "fela-monolithic" {
  import { TEnhancer } from "fela";

  export default function(): TEnhancer;
}

declare module "fela-perf" {
  import { TEnhancer } from "fela";

  export default function(): TEnhancer;
}

declare module "fela-statistics" {
  import { TEnhancer } from "fela";

  export default function(): TEnhancer;
}

/**
 * PLUGINS
 */
declare module "fela-plugin-custom-property" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela-plugin-extend" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela-plugin-fallback-value" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela-plugin-friendly-pseudo-class" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela-plugin-isolation" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela-plugin-logger" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela-plugin-lvha" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela-plugin-named-media-query" {
  import { TPlugin } from "fela";

  interface Parameters {
    [key: string]: string;
  }

  export default function(param: Parameters): TPlugin;
}

declare module "fela-plugin-placeholder-prefixer" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela-plugin-prefixer" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela-plugin-dynamic-prefixer" {
  import { TPlugin } from "fela";

  interface Configs {
    userAgent?: any;
    keepUnprefixed?: boolean;
  }

  export default function(configs: Configs): TPlugin;
}

declare module "fela-plugin-remove-undefined" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela-plugin-unit" {
  import { TPlugin } from "fela";

  type Unit = "ch" | "em" | "ex" | "rem" | "vh" | "vw" | "vmin" | "vmax" | "px" | "cm" | "mm" | "in" | "pc" | "pt" | "mozmm";
  interface UnitPerProperty {
    [key: string]: string;
  }

  export default function(unit?: Unit, unitPerProperty?: UnitPerProperty): TPlugin;
}

declare module "fela-plugin-validator" {
  import { TPlugin } from "fela";

  interface Configs {
    logInvalid?: boolean;
    deleteInvalid?: boolean;
  }

  export default function(configs: Configs): TPlugin;
}

/**
 * PRESETS
 */
declare module "fela-preset-web" {
  import { TPlugin } from "fela";

  const presets: TPlugin[];
  export default presets;
}

declare module "fela-preset-dev" {
  import { TPlugin } from "fela";

  const presets: TPlugin[];
  export default presets;
}

/**
 * TODO:
 *
 * 1. definition for `connect` is missing
 */
declare module "react-fela" {
  import * as React from "react";
  import { IRenderer } from "fela";

  interface ThemeProviderProps {
    theme: object;
    overwrite?: boolean;
  }

  /**
   * Fela Theme Provider
   */
  export class ThemeProvider extends React.Component<ThemeProviderProps, {}> { }

  interface ProviderProps {
    renderer: object;
    mountNode?: any;
  }

  /**
   * Fela Provider
   *
   * @see {@link https://github.com/rofrischmann/fela/blob/master/modules/bindings/react/ThemeProvider.js}
   */
  export class Provider extends React.Component<ProviderProps, {}> { }

  type StyleFunction<Props> = (props: Props) => React.CSSProperties;

  type Style<Props> = React.CSSProperties | StyleFunction<Props>;

  type PassThroughProps = Array<string>;

  /**
   * Fela injects theme props.
   *
   * @see {@link https://github.com/rofrischmann/fela/blob/master/modules/bindings/createComponentFactory.js#L52}
   */
  interface FelaInjectedProps {
    theme?: any;
    /**
     * To change the type on runtime and/or for each component, you may use the is prop.
     */
    is?: string;
    /**
     * This use case is especially important for library owners.
     * Instead of passing the passThroughProps to the createComponent call directly,
     * one can also use the passThrough prop on the created component to achieve the same effect.
     */
    passThrough?: PassThroughProps;
    /**
     * ref to underlying component
     *
     * @see {@link https://github.com/rofrischmann/fela/blob/master/modules/bindings/createComponentFactory.js#L68}
     */
    innerRef?: (instance: any) => void;
  }

  /**
   * Returns a stateless HTML React component with Fela styles.
   *
   * @see {@link https://github.com/rofrischmann/fela/blob/master/modules/bindings/createComponentFactory.js#L15-L82}
   */
  type FelaHtmlComponent<Props, Elem> = React.ComponentClass<Props & FelaInjectedProps & React.HTMLProps<Elem>>;

  /**
   * Returns a stateless SVG React component with Fela styles.
   */
  type FelaSvgComponent<Props, Elem extends SVGElement> = React.ComponentClass<Props & FelaInjectedProps & React.SVGAttributes<Element>>;

  /**
   * By default, Fela returns a `div` stateless React component.
   *
   * @see {@link https://github.com/rofrischmann/fela/blob/master/modules/bindings/createComponentFactory.js#L12}
   */
  type DefaultFelaHtmlComponent<Props> = FelaHtmlComponent<Props, HTMLDivElement>;

  /**
   *
   * @param {Style} style - style function
   */
  export function createComponent<Props>(style: Style<Props>): DefaultFelaHtmlComponent<Props>;

  /**
   *
   * @param {Style} style - style function
   * @param {string} base - HTML element tag name
   * @param {Array<string>} passThroughProps - A list of props that get passed to the underlying element.
   */
  export function createComponent<Props, Elem extends HTMLElement>(style: Style<Props>, base: string, passThroughProps?: Array<string>): FelaHtmlComponent<Props, Elem>;

  /**
   *
   * @param {Style} style - style function
   * @param {FelaHtmlComponent} base - Fela component
   * @param {Array<string>} passThroughProps - A list of props that get passed to the underlying element.
   */
  export function createComponent<Props, BaseProps, Elem extends HTMLElement>(style: Style<Props>, base: FelaHtmlComponent<BaseProps, Elem>, passThroughProps?: Array<string>): FelaHtmlComponent<BaseProps & Props, Elem>;

  export function createComponent<Props>(style: Style<Props>, base: "a", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLAnchorElement>;
  export function createComponent<Props>(style: Style<Props>, base: "abbr", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "address", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "area", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLAreaElement>;
  export function createComponent<Props>(style: Style<Props>, base: "article", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "aside", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "audio", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLAudioElement>;
  export function createComponent<Props>(style: Style<Props>, base: "b", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "base", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLBaseElement>;
  export function createComponent<Props>(style: Style<Props>, base: "bdi", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "bdo", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "big", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "blockquote", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "body", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLBodyElement>;
  export function createComponent<Props>(style: Style<Props>, base: "br", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLBRElement>;
  export function createComponent<Props>(style: Style<Props>, base: "button", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLButtonElement>;
  export function createComponent<Props>(style: Style<Props>, base: "canvas", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLCanvasElement>;
  export function createComponent<Props>(style: Style<Props>, base: "caption", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "cite", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "code", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "col", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLTableColElement>;
  export function createComponent<Props>(style: Style<Props>, base: "colgroup", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLTableColElement>;
  export function createComponent<Props>(style: Style<Props>, base: "data", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "datalist", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLDataListElement>;
  export function createComponent<Props>(style: Style<Props>, base: "dd", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "del", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "details", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "dfn", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "dialog", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "div", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLDivElement>;
  export function createComponent<Props>(style: Style<Props>, base: "dl", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLDListElement>;
  export function createComponent<Props>(style: Style<Props>, base: "dt", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "em", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "embed", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLEmbedElement>;
  export function createComponent<Props>(style: Style<Props>, base: "fieldset", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLFieldSetElement>;
  export function createComponent<Props>(style: Style<Props>, base: "figcaption", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "figure", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "footer", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "form", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLFormElement>;
  export function createComponent<Props>(style: Style<Props>, base: "h1", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLHeadingElement>;
  export function createComponent<Props>(style: Style<Props>, base: "h2", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLHeadingElement>;
  export function createComponent<Props>(style: Style<Props>, base: "h3", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLHeadingElement>;
  export function createComponent<Props>(style: Style<Props>, base: "h4", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLHeadingElement>;
  export function createComponent<Props>(style: Style<Props>, base: "h5", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLHeadingElement>;
  export function createComponent<Props>(style: Style<Props>, base: "h6", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLHeadingElement>;
  export function createComponent<Props>(style: Style<Props>, base: "head", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLHeadElement>;
  export function createComponent<Props>(style: Style<Props>, base: "header", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "hgroup", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "hr", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLHRElement>;
  export function createComponent<Props>(style: Style<Props>, base: "html", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLHtmlElement>;
  export function createComponent<Props>(style: Style<Props>, base: "i", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "iframe", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLIFrameElement>;
  export function createComponent<Props>(style: Style<Props>, base: "img", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLImageElement>;
  export function createComponent<Props>(style: Style<Props>, base: "input", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLInputElement>;
  export function createComponent<Props>(style: Style<Props>, base: "ins", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLModElement>;
  export function createComponent<Props>(style: Style<Props>, base: "kbd", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "keygen", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "label", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLLabelElement>;
  export function createComponent<Props>(style: Style<Props>, base: "legend", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLLegendElement>;
  export function createComponent<Props>(style: Style<Props>, base: "li", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLLIElement>;
  export function createComponent<Props>(style: Style<Props>, base: "link", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLLinkElement>;
  export function createComponent<Props>(style: Style<Props>, base: "main", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "map", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLMapElement>;
  export function createComponent<Props>(style: Style<Props>, base: "mark", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "menu", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "menuitem", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "meta", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLMetaElement>;
  export function createComponent<Props>(style: Style<Props>, base: "meter", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "nav", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "noindex", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "noscript", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "object", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLObjectElement>;
  export function createComponent<Props>(style: Style<Props>, base: "ol", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLOListElement>;
  export function createComponent<Props>(style: Style<Props>, base: "optgroup", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLOptGroupElement>;
  export function createComponent<Props>(style: Style<Props>, base: "option", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLOptionElement>;
  export function createComponent<Props>(style: Style<Props>, base: "output", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "p", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLParagraphElement>;
  export function createComponent<Props>(style: Style<Props>, base: "param", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLParamElement>;
  export function createComponent<Props>(style: Style<Props>, base: "picture", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLPictureElement>;
  export function createComponent<Props>(style: Style<Props>, base: "pre", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLPreElement>;
  export function createComponent<Props>(style: Style<Props>, base: "progress", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLProgressElement>;
  export function createComponent<Props>(style: Style<Props>, base: "q", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLQuoteElement>;
  export function createComponent<Props>(style: Style<Props>, base: "rp", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "rt", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "ruby", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "s", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "samp", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "script", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "section", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "select", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLSelectElement>;
  export function createComponent<Props>(style: Style<Props>, base: "small", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "source", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLSourceElement>;
  export function createComponent<Props>(style: Style<Props>, base: "span", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLSpanElement>;
  export function createComponent<Props>(style: Style<Props>, base: "strong", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "style", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLStyleElement>;
  export function createComponent<Props>(style: Style<Props>, base: "sub", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "summary", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "sup", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "table", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLTableElement>;
  export function createComponent<Props>(style: Style<Props>, base: "tbody", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLTableSectionElement>;
  export function createComponent<Props>(style: Style<Props>, base: "td", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLTableDataCellElement>;
  export function createComponent<Props>(style: Style<Props>, base: "textarea", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLTextAreaElement>;
  export function createComponent<Props>(style: Style<Props>, base: "tfoot", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLTableSectionElement>;
  export function createComponent<Props>(style: Style<Props>, base: "th", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLTableHeaderCellElement>;
  export function createComponent<Props>(style: Style<Props>, base: "thead", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLTableSectionElement>;
  export function createComponent<Props>(style: Style<Props>, base: "time", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "title", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLTitleElement>;
  export function createComponent<Props>(style: Style<Props>, base: "tr", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLTableRowElement>;
  export function createComponent<Props>(style: Style<Props>, base: "track", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLTrackElement>;
  export function createComponent<Props>(style: Style<Props>, base: "u", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "ul", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLUListElement>;
  export function createComponent<Props>(style: Style<Props>, base: "var", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "video", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLVideoElement>;
  export function createComponent<Props>(style: Style<Props>, base: "wbr", passThroughProps?: PassThroughProps): FelaHtmlComponent<Props, HTMLElement>;

  export function createComponent<Props>(style: Style<Props>, base: "svg", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "circle", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "clipPath", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "defs", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "desc", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "ellipse", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feBlend", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feColorMatrix", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feComponentTransfer", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feComposite", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feConvolveMatrix", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feDiffuseLighting", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feDisplacementMap", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feDistantLight", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feFlood", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feFuncA", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feFuncB", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feFuncG", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feFuncR", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feGaussianBlur", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feImage", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feMerge", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feMergeNode", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feMorphology", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feOffset", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "fePointLight", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feSpecularLighting", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feSpotLight", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feTile", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feTurbulence", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "filter", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "foreignObject", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "g", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "image", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "line", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "linearGradient", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "marker", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "mask", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "metadata", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "path", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "pattern", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "polygon", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "polyline", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "radialGradient", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "rect", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "stop", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "switch", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "symbol", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "text", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "textPath", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "tspan", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "use", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "view", passThroughProps?: PassThroughProps): FelaSvgComponent<Props, SVGElement>;
}
