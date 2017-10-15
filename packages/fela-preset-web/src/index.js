/* @flow */
import extend from 'fela-plugin-extend'
import embedded from 'fela-plugin-embedded'
import prefixer from 'fela-plugin-prefixer'
import fallbackValue from 'fela-plugin-fallback-value'
import LVHA from 'fela-plugin-lvha'
import unit from 'fela-plugin-unit'

export default [
  extend(),
  embedded(),
  prefixer(),
  fallbackValue(),
  LVHA(),
  unit()
]
