/* @flow */
type BabelInterface = {
  types: Object
}
export default function({ types }: BabelInterface) {
  const { stringLiteral } = types

  return {
    visitor: {
      Program(path: Object, file: any) {
        path.body = stringLiteral('hello')
        console.log(file)
      }
    }
  }
}
