import validateStyle from './validateStyle'
import processStyle from './processStyle'
import extractDynamicStyle from './extractDynamicStyle'

/**
 *  processes, flattens, normalizes and diffs style
 *
 * @param {Object} pluginInterface - plugin interface to process style
 * @param {Object} baseStyle - static base style
 * @return {Object} processed style
 */
export default function prepareStyle(pluginInterface, baseStyle, propsReference) {
  const processedStyle = processStyle(pluginInterface)
  const validatedStyle = validateStyle(processedStyle)

  // only diff and extract dynamic style
  // if not actually rendering the base style
  if (propsReference !== '') {
    return extractDynamicStyle(validatedStyle, baseStyle)
  }

  return validatedStyle
}