export default function isSupport(property) {
  return property.substr(0, 9) === '@supports'
}
