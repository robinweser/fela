import logger from 'fela-plugin-logger'
import validator from 'fela-plugin-validator'

export function createDevPreset({ validator: validatorConfig = [] } = {}) {
  return [logger(), validator(...validatorConfig)]
}

export default createDevPreset()
