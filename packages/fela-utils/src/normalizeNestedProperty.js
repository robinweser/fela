export default function normalizeNestedProperty(nestedProperty) {
  if (nestedProperty.charAt(0) === '&') {
    return nestedProperty.substr(1)
  }

  return nestedProperty
}
