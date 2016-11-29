/* @flow weak */
import generateContentHash from './generateContentHash'

/**
 * generates an unique reference id by content hashing props
 *
 * @param {Object} props - props that get hashed
 * @return {string} reference - unique props reference
 */
export default props => generateContentHash(JSON.stringify(props))
