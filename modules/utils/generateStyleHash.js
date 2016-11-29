/* @flow weak */
import generateContentHash from './generateContentHash'

/**
 * generates an unique reference hash
 *
 * @param {Object} style - style that get hashed
 * @return {string} hash - unique style hash
 */
export default style => generateContentHash(JSON.stringify(style))
