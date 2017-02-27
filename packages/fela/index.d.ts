declare module "fela" {

  import React from 'react';

  type TRuleProps = {};
  type TRule = (props: TRuleProps) => IStyle; 
  type TKeyFrame = TRule;
  type TRendererCreator = (config?: IConfig) => IRenderer;
  type TPlugin = (style: IStyle) => IStyle; //http://fela.js.org/docs/advanced/Plugins.html
  type TEnhancer = (renderer: IRenderer) => IRenderer; //http://fela.js.org/docs/advanced/Enhancers.html

  interface IRenderer {
    renderRule(rule: TRule, props: TRuleProps): void;
    renderKeyframe(keyFrame: TKeyFrame, props: TRuleProps): void;
    renderFont(family: string, files: Array<string>, props: TRuleProps): void;
    renderStatic(style: string, selector?: string): void;
    renderToString(): string;
    subscribe(event: (msg: string) => void): { unsubscribe: () => void; }
    clear();
  }

  //http://fela.js.org/docs/advanced/RendererConfiguration.html
  interface IConfig {
    plugins?: Array<TPlugin>;
    keyframePrefixes?: Array<string>;
    enhancers?: Array<TEnhancer>;
    mediaQueryOrder?: Array<string>;
    selectorPrefix?: string;
  }

  interface IStyle extends React.CSSProperties {
    //TODO: add properties, missing in React.CSSProperties
  }

  function createRenderer(config?: IConfig): IRenderer;
  function combineRules(...rules: Array<TRule>): TRule;
  function enhance(...enhancers: Array<TEnhancer>): (rendererCreator: TRendererCreator) => TRendererCreator;
}

declare module "fela-dom" {
  import { IRenderer } from 'fela';
  function render(renderer: IRenderer, node: HTMLElement);
}

