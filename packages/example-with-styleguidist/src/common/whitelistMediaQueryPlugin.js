// Credits: Vojtech Miksu aka Tajo (https://github.com/tajo)
const isObject = value => typeof value === 'object' && !Array.isArray(value)

const flipKeysAndValues = input =>
  Object.keys(input).reduce((obj, key) => ({ ...obj,
    [input[key]]: key }), {})

function checkMediaQuery(style, mediaQueryMap, aliases) {
  for (const property in style) {
    const value = style[property]

    if (isObject(value)) {
      checkMediaQuery(value, mediaQueryMap, aliases)
      if (
        property.substring(0, 6) === '@media' &&
        !mediaQueryMap.hasOwnProperty(property)
      ) {
        // eslint-disable-next-line no-console
        console.warn(
          `Please don't use "${property}". Use one of the aliases: ${aliases.join(
            ', '
          )}.
More info: https://github.com/cloudflare/cf-ui/tree/master/packages/cf-style-provider#named-media-query`
        )
      }
    }
  }
  return style
}

export default function whitelistMediaQuery(mediaQueryMap) {
  return style =>
    checkMediaQuery(
      style,
      flipKeysAndValues(mediaQueryMap),
      Object.keys(mediaQueryMap)
    )
}
