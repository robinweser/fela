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

  interface MonolithicOptions {
    prettySelectors?: boolean;
  }

  export default function(options: MonolithicOptions): TEnhancer;
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

  interface FelaWithThemeProps<Theme> {
    /**
     * ref to underlying component
     *
     * @see {@link https://github.com/rofrischmann/fela/blob/master/modules/bindings/createComponentFactory.js#L68}
     */
    innerRef?: (instance: any) => void,
    theme: Theme,
  }
  /**
   *
   * @param {React.ComponentType} Component  - component to inject theme into.
   */
  export function withTheme<Props, Theme>(Component: React.ComponentType<FelaWithThemeProps<Theme> & Props>): React.ComponentType<Props>;

  /**
   * Fela Provider
   *
   * @see {@link https://github.com/rofrischmann/fela/blob/master/modules/bindings/react/ThemeProvider.js}
   */
  export class Provider extends React.Component<ProviderProps, {}> { }

  type StyleFunction<Props> = (props: Props) => React.CSSProperties;

  type Style<Props> = React.CSSProperties | StyleFunction<Props>;

  type PassThroughFunction<Props> = (props: Props) => Array<string>

  type PassThroughProps<Props> = Array<string> | PassThroughFunction<Props>;

  export type Rules<Props, Styles> = {[key in keyof Styles]: Style<Props>}

  type RulesFunction<Props, Styles> = (props: Props) => Rules<Props, Styles>

  export type RulesConfig<Props, Styles> = Rules<Props, Styles> | RulesFunction<Props, Styles>

  export interface FelaWithStylesProps<Styles, Theme = any> extends FelaWithThemeProps<Theme> {
    styles: {[key in keyof Styles]: string}
  }

  /**
   *
   * @param {React.ComponentType} Component  - component to inject styles theme into.
   */
  interface WithRules<Props, Styles, Theme = any>{
    (Component: React.ComponentType<FelaWithStylesProps<Styles, Theme> & Props>): React.ComponentType<Props>
  }

  /**
   *
   * @param {RulesConfig} rules  - rules that will be injected in the Component.
   */
  export function connect<Props, Styles, Theme = any>(
    rules: RulesConfig<Props & FelaWithThemeProps<Theme>, Styles>
  ): WithRules<Props, Styles, Theme>

  /**
   * Fela injects theme props.
   *
   * @see {@link https://github.com/rofrischmann/fela/blob/master/modules/bindings/createComponentFactory.js#L52}
   */
  interface FelaInjectedProps<Props, Theme = any> {
    theme?: Theme;
    /**
     * To change the type on runtime and/or for each component, you may use the as prop.
     */
    as?: string | React.ComponentType<Props>;
    /**
     * This use case is especially important for library owners.
     * Instead of passing the passThroughProps to the createComponent call directly,
     * one can also use the passThrough prop on the created component to achieve the same effect.
     */
    passThrough?: PassThroughProps<Props>;
    /**
     * ref to underlying component
     *
     * @see {@link https://github.com/rofrischmann/fela/blob/master/modules/bindings/createComponentFactory.js#L68}
     */
    innerRef?: (instance: any) => void;
    /**
     * Extend component styles.
     *
     * @see {@link https://github.com/rofrischmann/fela/blob/master/packages/react-fela/docs/createComponent.md#extending-styles}
     */
    extend?: Style<Props>;
  }

  /**
   * Returns a stateless HTML React component with Fela styles.
   *
   * @see {@link https://github.com/rofrischmann/fela/blob/master/modules/bindings/createComponentFactory.js#L15-L82}
   */
  type FelaHtmlComponent<Props, Elem, Theme = any> = React.ComponentType<Props & FelaInjectedProps<Props, Theme> & React.HTMLProps<Elem>>;

  /**
   * Returns a stateless SVG React component with Fela styles.
   */
  type FelaSvgComponent<Props, Elem extends SVGElement, Theme = any> = React.ComponentType<Props & FelaInjectedProps<Props, Theme> & React.SVGAttributes<Element>>;

  /**
   * By default, Fela returns a `div` stateless React component.
   *
   * @see {@link https://github.com/rofrischmann/fela/blob/master/modules/bindings/createComponentFactory.js#L12}
   */
  type DefaultFelaHtmlComponent<Props, Theme = any> = FelaHtmlComponent<Props, HTMLDivElement, Theme>;

  /**
   *
   * @param {Style} style - style function
   */
  export function createComponent<Props, Theme = any>(style: Style<Props>): DefaultFelaHtmlComponent<Props, Theme>;

  /**
   *
   * @param {Style} style - style function
   * @param {string} base - HTML element tag name
   * @param {Array<string>} passThroughProps - A list of props that get passed to the underlying element.
   */
  export function createComponent<Props, Elem extends HTMLElement, Theme = any>(style: Style<Props>, base: string, passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, Elem, Theme>;

  /**
   *
   * @param {Style} style - style function
   * @param {FelaHtmlComponent} base - Fela component
   * @param {Array<string>} passThroughProps - A list of props that get passed to the underlying element.
   */
  export function createComponent<Props, BaseProps, Elem extends HTMLElement, Theme = any>(style: Style<Props>, base: FelaHtmlComponent<BaseProps, Elem>, passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<BaseProps & Props, Elem, Theme>;

  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "a", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLAnchorElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "abbr", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "address", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "area", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLAreaElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "article", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "aside", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "audio", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLAudioElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "b", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "base", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLBaseElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "bdi", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "bdo", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "big", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "blockquote", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "body", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLBodyElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "br", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLBRElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "button", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLButtonElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "canvas", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLCanvasElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "caption", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "cite", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "code", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "col", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableColElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "colgroup", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableColElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "data", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "datalist", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLDataListElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "dd", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "del", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "details", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "dfn", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "dialog", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "div", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLDivElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "dl", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLDListElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "dt", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "em", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "embed", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLEmbedElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "fieldset", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLFieldSetElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "figcaption", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "figure", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "footer", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "form", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLFormElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "h1", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadingElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "h2", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadingElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "h3", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadingElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "h4", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadingElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "h5", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadingElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "h6", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadingElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "head", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "header", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "hgroup", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "hr", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHRElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "html", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHtmlElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "i", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "iframe", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLIFrameElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "img", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLImageElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "input", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLInputElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "ins", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLModElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "kbd", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "keygen", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "label", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLLabelElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "legend", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLLegendElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "li", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLLIElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "link", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLLinkElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "main", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "map", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLMapElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "mark", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "menu", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "menuitem", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "meta", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLMetaElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "meter", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "nav", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "noindex", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "noscript", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "object", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLObjectElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "ol", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLOListElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "optgroup", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLOptGroupElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "option", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLOptionElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "output", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "p", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLParagraphElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "param", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLParamElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "picture", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLPictureElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "pre", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLPreElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "progress", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLProgressElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "q", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLQuoteElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "rp", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "rt", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "ruby", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "s", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "samp", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "script", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "section", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "select", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLSelectElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "small", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "source", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLSourceElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "span", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLSpanElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "strong", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "style", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLStyleElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "sub", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "summary", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "sup", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "table", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "tbody", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableSectionElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "td", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableDataCellElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "textarea", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTextAreaElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "tfoot", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableSectionElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "th", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableHeaderCellElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "thead", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableSectionElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "time", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "title", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTitleElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "tr", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableRowElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "track", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTrackElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "u", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "ul", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLUListElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "var", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "video", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLVideoElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "wbr", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;

  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "svg", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "circle", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "clipPath", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "defs", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "desc", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "ellipse", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "feBlend", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "feColorMatrix", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "feComponentTransfer", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "feComposite", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "feConvolveMatrix", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "feDiffuseLighting", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "feDisplacementMap", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "feDistantLight", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "feFlood", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "feFuncA", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "feFuncB", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "feFuncG", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "feFuncR", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "feGaussianBlur", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "feImage", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "feMerge", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "feMergeNode", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "feMorphology", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "feOffset", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "fePointLight", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "feSpecularLighting", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "feSpotLight", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "feTile", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "feTurbulence", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "filter", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "foreignObject", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "g", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "image", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "line", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "linearGradient", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "marker", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "mask", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "metadata", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "path", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "pattern", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "polygon", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "polyline", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "radialGradient", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "rect", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "stop", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "switch", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "symbol", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "text", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "textPath", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "tspan", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "use", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
  export function createComponent<Props, Theme = any>(style: Style<Props>, base: "view", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;


  /**
   *
   * @param {Style} style - style function
   */
  export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>): DefaultFelaHtmlComponent<Props, Theme>;

    /**
     *
     * @param {Style} style - style function
     * @param {string} base - HTML element tag name
     * @param {Array<string>} passThroughProps - A list of props that get passed to the underlying element.
     */
    export function createComponentWithProxy<Props, Elem extends HTMLElement, Theme = any>(style: Style<Props>, base: string, passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, Elem, Theme>;

    /**
     *
     * @param {Style} style - style function
     * @param {FelaHtmlComponent} base - Fela component
     * @param {Array<string>} passThroughProps - A list of props that get passed to the underlying element.
     */
    export function createComponentWithProxy<Props, BaseProps, Elem extends HTMLElement, Theme = any>(style: Style<Props>, base: FelaHtmlComponent<BaseProps, Elem>, passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<BaseProps & Props, Elem, Theme>;

    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "a", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLAnchorElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "abbr", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "address", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "area", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLAreaElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "article", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "aside", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "audio", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLAudioElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "b", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "base", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLBaseElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "bdi", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "bdo", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "big", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "blockquote", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "body", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLBodyElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "br", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLBRElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "button", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLButtonElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "canvas", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLCanvasElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "caption", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "cite", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "code", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "col", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableColElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "colgroup", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableColElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "data", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "datalist", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLDataListElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "dd", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "del", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "details", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "dfn", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "dialog", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "div", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLDivElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "dl", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLDListElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "dt", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "em", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "embed", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLEmbedElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "fieldset", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLFieldSetElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "figcaption", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "figure", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "footer", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "form", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLFormElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "h1", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadingElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "h2", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadingElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "h3", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadingElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "h4", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadingElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "h5", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadingElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "h6", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadingElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "head", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHeadElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "header", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "hgroup", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "hr", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHRElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "html", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLHtmlElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "i", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "iframe", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLIFrameElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "img", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLImageElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "input", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLInputElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "ins", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLModElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "kbd", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "keygen", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "label", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLLabelElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "legend", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLLegendElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "li", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLLIElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "link", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLLinkElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "main", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "map", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLMapElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "mark", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "menu", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "menuitem", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "meta", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLMetaElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "meter", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "nav", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "noindex", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "noscript", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "object", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLObjectElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "ol", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLOListElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "optgroup", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLOptGroupElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "option", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLOptionElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "output", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "p", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLParagraphElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "param", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLParamElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "picture", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLPictureElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "pre", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLPreElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "progress", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLProgressElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "q", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLQuoteElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "rp", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "rt", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "ruby", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "s", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "samp", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "script", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "section", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "select", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLSelectElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "small", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "source", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLSourceElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "span", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLSpanElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "strong", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "style", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLStyleElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "sub", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "summary", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "sup", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "table", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "tbody", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableSectionElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "td", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableDataCellElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "textarea", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTextAreaElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "tfoot", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableSectionElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "th", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableHeaderCellElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "thead", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableSectionElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "time", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "title", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTitleElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "tr", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTableRowElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "track", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLTrackElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "u", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "ul", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLUListElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "var", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "video", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLVideoElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "wbr", passThroughProps?: PassThroughProps<Props>): FelaHtmlComponent<Props, HTMLElement, Theme>;

    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "svg", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "circle", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "clipPath", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "defs", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "desc", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "ellipse", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "feBlend", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "feColorMatrix", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "feComponentTransfer", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "feComposite", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "feConvolveMatrix", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "feDiffuseLighting", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "feDisplacementMap", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "feDistantLight", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "feFlood", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "feFuncA", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "feFuncB", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "feFuncG", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "feFuncR", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "feGaussianBlur", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "feImage", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "feMerge", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "feMergeNode", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "feMorphology", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "feOffset", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "fePointLight", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "feSpecularLighting", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "feSpotLight", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "feTile", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "feTurbulence", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "filter", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "foreignObject", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "g", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "image", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "line", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "linearGradient", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "marker", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "mask", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "metadata", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "path", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "pattern", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "polygon", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "polyline", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "radialGradient", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "rect", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "stop", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "switch", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "symbol", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "text", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "textPath", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "tspan", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "use", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
    export function createComponentWithProxy<Props, Theme = any>(style: Style<Props>, base: "view", passThroughProps?: PassThroughProps<Props>): FelaSvgComponent<Props, SVGElement, Theme>;
}
