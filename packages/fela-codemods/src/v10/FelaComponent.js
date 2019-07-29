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
          const openingElement = path.node.openingElement

          const styleProp = openingElement.attributes.find(
            prop => prop.name.name === 'style'
          )
          const ruleProp = openingElement.attributes.find(
            prop => prop.name.name === 'rule'
          )
          const renderProp = openingElement.attributes.find(
            prop => prop.name.name === 'render'
          )

          // handle render/as transformation to children/as
          if (renderProp) {
            const hasChildren =
              path.node.children.length > 0 ||
              !!openingElement.attributes.find(
                prop => prop.name.name === 'children'
              )

            if (hasChildren) renderProp.name.name = 'as'
            else {
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
            const { value } = styleProp
            if (value && value.expression.type === 'Identifier') {
              console.warn(
                `The style value in line ${value.expression.loc.start.line} is a reference to an external variable. ` +
                  'We have no way to check and convert it to the new syntax. Please do so manually'
              )
            }
            const styleIsArrowFn =
              value && value.expression.type === 'ArrowFunctionExpression'
            const styleIsFn =
              value && value.expression.type === 'FunctionExpression'
            const styleTransformer = (stylePath, i) => {
              const param = stylePath.node.params[0]

              if (param.type === 'Identifier' && i === 0) {
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
            }
            if (styleIsArrowFn) {
              j(styleProp)
                .find(j.ArrowFunctionExpression)
                .forEach(styleTransformer)
            }

            if (styleIsFn) {
              // TODO: Don't convert to arrow function and remove the warning
              console.warn(
                `Converting a function expression style function into an arrow function in line ${value.expression.loc.start.line}`
              )
              j(styleProp)
                .find(j.FunctionExpression)
                .forEach(styleTransformer)
            }
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
