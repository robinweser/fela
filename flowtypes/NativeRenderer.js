import type Cache from './Cache'

export type NativeRenderer = {
  plugins: Array<Function>,
  listeners: Array<Function>,
  isNativeRenderer: true,
  cache: Cache,
  renderRule: Function,
  subscribe: Function,
  clear: Function,
  _emitChange: Function,
};

export type NativeRendererConfig = {
  plugins: Array<Function>,
};
