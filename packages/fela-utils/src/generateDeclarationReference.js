export default function generateDeclarationReference(
  property,
  value,
  pseudo = '',
  media = '',
  support = ''
) {
  return support + media + pseudo + property + value
}
