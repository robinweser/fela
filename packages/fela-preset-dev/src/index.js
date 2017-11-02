/* @flow weak */
import logger from 'fela-plugin-logger'
import validator from 'fela-plugin-validator'

type Config = {
  'fela-plugin-logger'?: Array<*>,
  'fela-plugin-validator'?: Array<*>
}

export const createDevPreset = (
  {
    'fela-plugin-logger': loggerConf = [
      {
        logMetaData: true
      }
    ],
    'fela-plugin-validator': validatorConf = []
  }: Config = {}
) => [logger(...loggerConf), validator(...validatorConf)]

export default createDevPreset()
