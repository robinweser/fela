export default function isBase64(property) {
  return property.substr(0, 5) === 'data:'
}
