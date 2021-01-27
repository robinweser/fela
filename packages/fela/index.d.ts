declare module "fela" {
  import * as CSS from 'csstype';
  import { TRuleType, TKeyframeType, TFontType, TStaticType, TClearType } from 'fela-utils';

  export type TRuleProps = {};
  export type TRule<T = TRuleProps> = (props: T, renderer: IRenderer) => IStyle
  export type TKeyFrame<T = TRuleProps> = (props: T, renderer: IRenderer) => {
    from?: IStyle,
    to?: IStyle,

    [persent: string]: IStyle | undefined;
  };

  type TRendererCreator = (config?: IConfig) => IRenderer;
  type TRenderType = 'RULE' | 'KEYFRAME' | 'FONT' | 'STATIC';

  type TPlugin<T = Record<string, unknown>> = {
    (
      style: IStyle,
      type: TRenderType,
      renderer: IRenderer,
      props: T,
    ): IStyle;
  };

  type TEnhancer = (renderer: IRenderer) => IRenderer; //http://fela.js.org/docs/advanced/Enhancers.html

  type TSubscribeMessageType = TRuleType | TKeyframeType | TFontType | TStaticType | TClearType

  interface ISubscribeMessage {
    type: TSubscribeMessageType;
  }
  interface ISubscribeRuleOrStaticObjectMessage extends ISubscribeMessage { static?: boolean; declaration: string; selector: string; media: string; }
  interface ISubscribeKeyframesMessage extends ISubscribeMessage { name: string; keyframe: string; }
  interface ISubscribeFontFaceMessage extends ISubscribeMessage { fontFamily: string; fontFace: string; }
  interface ISubscribeStaticStringMessage extends ISubscribeMessage { css: string; }
  interface ISubscribeClearMessage extends ISubscribeMessage { }

  interface IRenderer {
    renderRule<T = TRuleProps>(rule: TRule<T>, props: T): string
    renderKeyframe<T = TRuleProps>(keyFrame: TKeyFrame<T>, props: T): string;
    renderFont<T = TRuleProps>(family: string, files: Array<string>, props: T): void;
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
    specificityPrefix?: string;
    filterClassName?: (className: string) => boolean;
    devMode?: boolean;
  }
  
  type CSSObject = CSSProperties & CSSPseudos;

  type CSSCustom = { [prop: string]: CSSCustomPrimitive | IStyle };
  type CSSCustomPrimitive = IStylePrimitiveExtension[keyof IStylePrimitiveExtension];

  type CSSProperties = CSS.Properties<number | string>;
  type CSSPropertiesFallback = CSS.PropertiesFallback<number | string>;

  type CSSPseudos = { [K in CSS.Pseudos]?: CSSObject; };

  interface IStyleExtension { __brand?: never }
  interface IStylePrimitiveExtension {
    _string: string;
    _number: number;
  }
  
  export type IStyle = 
    | CSSObject
    | CSSCustom
    | IStyleExtension;

  function createRenderer(config?: IConfig): IRenderer;

  function combineRules<A, B>(a: TRule<A>, b: TRule<B>): TRule<A & B>
  function combineRules<A, B, C>(
    a: TRule<A>,
    b: TRule<B>,
    c: TRule<C>,
  ): TRule<A & B & C>
  function combineRules(...rules: Array<TRule>): TRule

  function enhance(...enhancers: Array<TEnhancer>): (rendererCreator: TRendererCreator) => TRendererCreator;
}

declare module "fela-dom" {
  import { IRenderer, TRenderType } from 'fela';

  function render(renderer: IRenderer): void;
  function rehydrate(renderer: IRenderer): void;
  function renderToMarkup(renderer: IRenderer): string;
  function renderToSheetList(renderer: IRenderer): {
    css: string,
    type: TRenderType,
    media?: string,
    support?: boolean,
  }[];
}

declare module "fela-tools" {
  import { TRule, TRuleProps, IStyle, IRenderer } from "fela";

  export type TMultiRuleObject<Props = TRuleProps, Styles = {}> = {[key in keyof Styles]: TRule<Props> | IStyle}
  export type TMultiRuleFunction<Props = TRuleProps, Styles = {}> = (props: Props, renderer: IRenderer) => TMultiRuleObject<Props, Styles>
  export type TMultiRule<Props = TRuleProps, Styles = {}> = TMultiRuleObject<Props, Styles> | TMultiRuleFunction<Props, Styles>

  export type TPartialMultiRuleObject<Props = TRuleProps, Styles = {}> = Partial<TMultiRuleObject<Props, Styles>>
  export type TPartialMultiRuleFunction<Props = TRuleProps, Styles = {}> = (props: Props, renderer: IRenderer) => TPartialMultiRuleObject<Props, Styles>
  export type TPartialMultiRule<Props = TRuleProps, Styles = {}> = TPartialMultiRuleObject<Props, Styles> | TPartialMultiRuleFunction<Props, Styles>

  export type TNormalizedMultiRule<Props = TRuleProps, Styles = {}> = (props: Props, renderer: IRenderer) => {[key in keyof Styles]: TRule<Props>}

  function combineMultiRules<A, SA, B, SB>(
    a: TMultiRule<A, SA>,
    b: TMultiRule<B, SB>
  ): TNormalizedMultiRule<A & B, SA & SB>
  function combineMultiRules<A, SA, B, SB, C, SC>(
    a: TMultiRule<A, SA>,
    b: TMultiRule<B, SB>,
    c: TMultiRule<C, SC>,
  ): TNormalizedMultiRule<A & B & C, SA & SB & SC>
  function combineMultiRules(...rules: Array<TMultiRule>): TNormalizedMultiRule

  function mapValueToMediaQuery(
    queryValueMap: { [key: string]: string },
    mapper: ((value: string) => object) | string
  ): object;

  function renderToElement(
    renderer: IRenderer,
    mountNode: { textContent: string },
  ): (() => void);

  function renderToString(
    renderer: IRenderer,
  ): string;
}

/**
 * ENHANCERS
 */
declare module "fela-beautifier" {
  import { TEnhancer } from "fela";

  export default function(options?: object): TEnhancer;
}

declare module "fela-identifier" {
  import { TRule, TEnhancer } from "fela";

  interface Configs {
    prefix?: string;
    generator?: (name?: string, index?: number) => string;
  }

  type Identifier = (name?: string) => TRule & {
    className: string;
    toString(): string;
  };

  export default function(configs?: Configs): TEnhancer & Identifier;
}

declare module "fela-layout-debugger" {
  import { TEnhancer } from "fela";

  interface DebuggerOptions {
    mode?: "outline" | "backgroundColor";
    thickness?: number;
  }

  export default function(options?: DebuggerOptions): TEnhancer;
}

declare module "fela-logger" {
  import { TEnhancer } from "fela";

  interface LoggerOptions {
    logCSS?: boolean;
    formatCSS?: boolean;
  }

  export default function(options?: LoggerOptions): TEnhancer;
}

declare module "fela-monolithic" {
  import { TEnhancer } from "fela";

  interface MonolithicOptions {
    prettySelectors?: boolean;
  }

  export default function(options?: MonolithicOptions): TEnhancer;
}

declare module "fela-perf" {
  import { TEnhancer } from "fela";

  export default function(): TEnhancer;
}

declare module "fela-statistics" {
  import { TEnhancer } from "fela";

  export default function(): TEnhancer;
}

declare module "fela-utils" {
  export type TRuleType = "RULE"
  export type TKeyframeType = "KEYFRAME"
  export type TFontType = "FONT"
  export type TStaticType = "STATIC"
  export type TClearType = "CLEAR"

  export const RULE_TYPE: TRuleType
  export const KEYFRAME_TYPE: TKeyframeType
  export const FONT_TYPE: TFontType
  export const STATIC_TYPE: TStaticType
  export const CLEAR_TYPE: TClearType
}

declare module "fela-sort-media-query-mobile-first" {
  import { TEnhancer } from "fela";

  export default function(): TEnhancer;
}

/**
 * PLUGINS
 */
declare module "fela-plugin-bidi" {
  import { TPlugin } from "fela";

  export default function(flowDirection: 'ltr' | 'rtl'): TPlugin;
}

declare module "fela-plugin-custom-property" {
  import { TPlugin } from "fela";

  interface CustomProperties {
    [property: string]: (value: any) => any,
  }

  export default function(properties: CustomProperties): TPlugin;
}

declare module "fela-plugin-embedded" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela-plugin-extend" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela-plugin-friendly-pseudo-class" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela-plugin-important" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela-plugin-isolation" {
  import { TPlugin } from "fela";

  interface IsolationOptions {
    exclude?: string[];
  }

  export default function(options?: IsolationOptions): TPlugin;
}

declare module "fela-plugin-logger" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela-plugin-named-keys" {
  import { TPlugin } from "fela";

  interface MediaQueryMap {
    [key: string]: string;
  }

  export default function(mediaQueryMap: MediaQueryMap): TPlugin;
}

declare module "fela-plugin-native-media-query" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela-plugin-placeholder-prefixer" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela-plugin-fullscreen-prefixer" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela-plugin-pseudo-prefixer" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela-plugin-theme-value" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela-plugin-prefixer" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela-plugin-rtl" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela-plugin-simulate" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela-plugin-unit" {
  import { TPlugin } from "fela";

  export type Unit = "ch" | "em" | "ex" | "rem" | "vh" | "vw" | "vmin" | "vmax" | "px" | "cm" | "mm" | "in" | "pc" | "pt" | "mozmm";

  export interface UnitPerProperty {
    [key: string]: string;
  }

  export default function(
    unit?: Unit,
    unitPerProperty?: UnitPerProperty,
    isUnitlessProperty?: (property: string) => boolean,
  ): TPlugin;
}

declare module "fela-plugin-validator" {
  import { TPlugin } from "fela";

  interface Configs {
    logInvalid?: boolean;
    deleteInvalid?: boolean;
    useCSSLint?: boolean | object;
  }

  export default function(configs?: Configs): TPlugin;
}

/**
 * PRESETS
 */
declare module "fela-preset-web" {
  import { TPlugin } from "fela";
  import { Unit, UnitPerProperty } from "fela-plugin-unit";

  type UnitConfig1 = [Unit]
  type UnitConfig2 = [Unit, UnitPerProperty]
  type UnitConfig3 = [Unit, UnitPerProperty, (property: string) => boolean]

  type UnitConfig = UnitConfig1 | UnitConfig2 | UnitConfig3

  export function createWebPreset({ unit }: { unit?: UnitConfig }): TPlugin[];

  const presets: TPlugin[];
  export default presets;
}

declare module "fela-preset-dev" {
  import { TPlugin } from "fela";

  const presets: TPlugin[];
  export default presets;
}
