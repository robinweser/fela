/* @flow */
import logger from 'fela-plugin-logger'
import validator from 'fela-plugin-validator'

type Config = {
  validator?: Array<any>,
}

export function createDevPreset({
  validator: validatorConfig = [],
}: Config = {}) {
  return [logger(), validator(...validatorConfig)]
}

export default createDevPreset()
