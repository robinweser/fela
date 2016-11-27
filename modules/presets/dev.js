/* @flow weak */
import logger from '../plugins/logger'
import validator from '../plugins/validator'

export default [ logger({ logMetaData: true }), validator() ]
