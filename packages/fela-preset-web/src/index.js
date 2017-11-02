/* @flow */
import extend from 'fela-plugin-extend'
import embedded from 'fela-plugin-embedded'
import prefixer from 'fela-plugin-prefixer'
import fallbackValue from 'fela-plugin-fallback-value'
import LVHA from 'fela-plugin-lvha'
import unit from 'fela-plugin-unit'

type Config = {
  'fela-plugin-extend'?: Array<*>,
  'fela-plugin-embedded'?: Array<*>,
  'fela-plugin-prefixer'?: Array<*>,
  'fela-plugin-fallback-value'?: Array<*>,
  'fela-plugin-lvha'?: Array<*>,
  'fela-plugin-unit'?: Array<*>
}
export const createWebPreset = (
  {
    'fela-plugin-extend': extendConf = [],
    'fela-plugin-embedded': embeddedConf = [],
    'fela-plugin-prefixer': prefixerConf = [],
    'fela-plugin-fallback-value': fallbackValueConf = [],
    'fela-plugin-lvha': lvhaConf = [],
    'fela-plugin-unit': unitConf = []
  }: Config = {}
) => [
  extend(...extendConf),
  embedded(...embeddedConf),
  prefixer(...prefixerConf),
  fallbackValue(...fallbackValueConf),
  LVHA(...lvhaConf),
  unit(...unitConf)
]

export default createWebPreset()
