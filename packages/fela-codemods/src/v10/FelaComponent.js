import getImportName from '../utils/getImportName'

const pkg = 'react-fela'
const component = 'FelaComponent'

export default function transformer(file, api) {
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

          const renderProp = path.node.openingElement.attributes.find(
            prop => prop.name.name === 'render'
          )

          // handle render/as transformation to children/as
          if (renderProp) {
            if (
              renderProp.value.type === 'Literal' ||
              (renderProp.value.type === 'JSXExpressionContainer' &&
                renderProp.value.expression.type === 'Literal')
            ) {
              renderProp.name.name = 'as'
            } else {
              j(path).replaceWith(
                j.jsxElement(
                  j.jsxOpeningElement(
                    j.jsxIdentifier(importName),
                    path.node.openingElement.attributes.filter(
                      prop => prop !== renderProp
                    ),
                    false
                  ),
                  j.jsxClosingElement(j.jsxIdentifier(importName)),
                  [renderProp.value],
                  false
                )
              )
            }
          }

          // replace inline style expression from theme
          if (styleProp) {
            j(styleProp)
              .find(j.ArrowFunctionExpression)
              .forEach(stylePath => {
                const param = stylePath.node.params[0]

                if (param.type === 'Identifier') {
                  j(stylePath).replaceWith(
                    j.arrowFunctionExpression(
                      [
                        j.objectPattern([
                          j.objectProperty(param, param, false, true),
                        ]),
                      ],
                      stylePath.node.body
                    )
                  )

                  // make property truly shorthand
                  stylePath.node.params[0].properties[0].shorthand = true
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
