/* @flow */
import camelCaseProperty from 'css-in-js-utils/lib/camelCaseProperty'

export default function generateDeclarationReference(
  property: string,
  value: any,
  pseudo?: string = '',
  media?: string = '',
  support?: string = ''
): string {
  return support + media + pseudo + camelCaseProperty(property) + value
}
