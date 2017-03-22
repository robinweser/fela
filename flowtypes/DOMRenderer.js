import type Cache from './Cache'

export type DOMRenderer = {
  keyframePrefixes: Array<string>,
  plugins: Array<Function>,
  mediaQueryOrder: Array<string>,
  selectorPrefix: string,
  listeners: Array<Function>,
  fontFaces: string,
  keyframes: string,
  statics: string,
  rules: string,
  mediaRules: {[query: string]: string},
  uniqueRuleIdentifier: number,
  uniqueKeyframeIdentifier: number,
  cache: Cache,
  renderRule: Function,
  renderKeyframe: Function,
  renderStatic: Function,
  renderFont: Function,
  renderToString: Function,
  subscribe: Function,
  clear: Function,
  _renderStyleToClassNames: Function,
  _emitChange: Function,
};

export type DOMRendererConfig = {
  keyframePrefixes?: Array<string>,
  plugins?: Array<Function>,
  enhancers?: Array<Function>,
  mediaQueryOrder?: Array<string>,
  selectorPrefix?: string,
};

export type Change = {};
