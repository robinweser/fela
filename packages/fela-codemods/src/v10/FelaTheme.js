import getImportName from '../utils/getImportName'

const pkg = 'react-fela'
const component = 'FelaTheme'

export default function transformer(file, api) {
  const j = api.jscodeshift

  const importName = getImportName(j, file.source, pkg, component)

  // only transform if FelaTheme is imported from react-fela
  if (importName) {
    // use children instead of render props
    return j(file.source)
      .find(j.JSXElement)
      .forEach(path => {
        if (path.node.openingElement.name.name === importName) {
          const renderProp = path.node.openingElement.attributes.find(
            el => el.name.name === 'render'
          )

          if (renderProp) {
            j(path).replaceWith(
              j.jsxElement(
                j.jsxOpeningElement(j.jsxIdentifier(importName), [], false),
                j.jsxClosingElement(j.jsxIdentifier(importName)),
                [renderProp.value],
                false
              )
            )
          }
        }
      })
      .toSource()
  }
  return file.source
}
