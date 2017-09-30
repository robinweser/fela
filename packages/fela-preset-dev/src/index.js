/* @flow weak */
import logger from 'fela-plugin-logger'
import validator from 'fela-plugin-validator'

export default [
  logger({
    logMetaData: true
  }),
  validator()
]
