import type Cache from './Cache'

export type DOMRenderer = {
  keyframePrefixes: Array<string>,
  plugins: Array<Function>,
  sortMediaQuery: Function,
  selectorPrefix: string,
  specificityPrefix: string,
  filterClassName: Function,
  listeners: Array<Function>,
  uniqueRuleIdentifier: number,
  uniqueKeyframeIdentifier: number,
  styleNodeAttributes: Object,
  cache: Cache,
  nodes: Object,
  renderRule: Function,
  renderKeyframe: Function,
  renderStatic: Function,
  renderFont: Function,
  subscribe: Function,
  clear: Function,
  _renderStyleToClassNames: Function,
  _emitChange: Function,
}

export type DOMRendererConfig = {
  keyframePrefixes?: Array<string>,
  plugins?: Array<Function>,
  enhancers?: Array<Function>,
  sortMediaQuery?: Function,
  styleNodeAttributes: Object,
  mediaQueryOrder?: Array<string>,
  selectorPrefix?: string,
  specificityPrefix?: string,
  filterClassName?: Function,
  devMode?: boolean,
}
