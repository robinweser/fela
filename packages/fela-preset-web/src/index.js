/* @flow weak */
import extend from 'fela-plugin-extend'
import prefixer from 'fela-plugin-prefixer'
import fallbackValue from 'fela-plugin-fallback-value'
import LVHA from 'fela-plugin-lvha'
import unit from 'fela-plugin-unit'

export default [extend(), prefixer(), fallbackValue(), LVHA(), unit()]
