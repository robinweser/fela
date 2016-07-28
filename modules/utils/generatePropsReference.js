import generateContentHash from './generateContentHash'
import sortedStringify from './sortedStringify'

/**
 * generates an unique reference id by content hashing props
 *
 * @param {Object} props - props that get hashed
 * @return {string} reference - unique props reference
 */
export default props => generateContentHash(sortedStringify(props))