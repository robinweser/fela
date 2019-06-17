import type Cache from './Cache'

export type DOMRendererDocumentRef = {
  target: Document,
  refId: string,
  refCount: number,
}

export type DOMRenderer = {
  keyframePrefixes: Array<string>,
  plugins: Array<Function>,
  mediaQueryOrder: Array<string>,
  selectorPrefix: string,
  filterClassName: Function,
  listeners: Array<Function>,
  uniqueRuleIdentifier: number,
  uniqueKeyframeIdentifier: number,
  cache: Cache,
  documentRefs: Array<DOMRendererDocumentRef>,
  nodes: { [string]: { node: Object, refId: string, score: string } },
  renderRule: Function,
  renderKeyframe: Function,
  renderStatic: Function,
  renderFont: Function,
  subscribe: Function,
  subscribeDocument: Function,
  clear: Function,
  _renderStyleToClassNames: Function,
  _emitChange: Function,
}

export type DOMRendererConfig = {
  keyframePrefixes?: Array<string>,
  plugins?: Array<Function>,
  enhancers?: Array<Function>,
  mediaQueryOrder?: Array<string>,
  selectorPrefix?: string,
  filterClassName?: Function,
  devMode?: boolean,
}
