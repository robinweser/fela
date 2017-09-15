export type Theme = {
  listeners: Array<Function>,
  previousProperties: Object,
  properties: Object,

  subscribe: Function,
  update: Function,
  get: Function,
  _emitChange: Function
}
