import extend from 'fela-plugin-extend'
import embedded from 'fela-plugin-embedded'
import prefixer from 'fela-plugin-prefixer'
import fallbackValue from 'fela-plugin-fallback-value'
import unit from 'fela-plugin-unit'

export function createWebPreset({
  extend: extendConfig = [],
  unit: unitConfig = [],
} = {}) {
  return [
    extend(...extendConfig),
    embedded(),
    unit(...unitConfig),
    prefixer(),
    fallbackValue(),
  ]
}

export default createWebPreset()
