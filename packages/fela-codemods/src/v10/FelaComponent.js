import getImportName from '../utils/getImportName'

const pkg = 'react-fela'
const component = 'FelaComponent'

export default function transformer(file, api, options) {
  const j = api.jscodeshift

  const importName = getImportName(j, file.source, pkg, component)

  // only transform if FelaComponent is imported from react-fela
  if (importName) {
    return j(file.source)
      .find(j.JSXElement)
      .forEach(path => {
        if (path.node.openingElement.name.name === importName) {
          const styleProp = path.node.openingElement.attributes.find(
            prop => prop.name.name === 'style'
          )

          const ruleProp = path.node.openingElement.attributes.find(
            prop => prop.name.name === 'rule'
          )

          // replace inline style expression from theme
          if (styleProp) {
            j(styleProp)
              .find(j.ArrowFunctionExpression)
              .forEach(path => {
                const param = path.node.params[0]

                if (param.type === 'Identifier') {
                  j(path).replaceWith(
                    j.arrowFunctionExpression(
                      [
                        j.objectPattern([
                          j.objectProperty(param, param, false, true),
                        ]),
                      ],
                      path.node.body
                    )
                  )

                  // make property truly shorthand
                  path.node.params[0].properties[0].shorthand = true
                }
              })
          }

          // rename rule to style
          if (ruleProp) {
            ruleProp.name.name = 'style'
          }
        }
      })
      .toSource()
  }

  return file.source
}
