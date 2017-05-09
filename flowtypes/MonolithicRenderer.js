import type DOMRenderer from './DOMRenderer'

type MonolithicRendererMethods = {
  _renderStyleToCache: Function
};

export type MonolithicRenderer = MonolithicRendererMethods & DOMRenderer;
