export default function generateDisplayName(component) {
  const displayName = component.displayName || component.name

  if (displayName) {
    return `Fela${displayName}`
  }

  return 'ConnectedFelaComponent'
}
