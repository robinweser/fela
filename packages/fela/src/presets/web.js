/* @flow weak */
import extend from '../plugins/extend'
import prefixer from '../plugins/prefixer'
import fallbackValue from '../plugins/fallbackValue'
import LVHA from '../plugins/LVHA'
import unit from '../plugins/unit'

export default [extend(), prefixer(), fallbackValue(), LVHA(), unit()]
