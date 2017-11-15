/* @flow */
import logger from 'fela-plugin-logger'
import validator from 'fela-plugin-validator'

type Config = {
  alidator?: Array<any>
}

export const createDevPreset = (
  { validator: validatorConfig = [] }: Config = {}
) => [logger(), validator(...validatorConfig)]

export default createDevPreset()
