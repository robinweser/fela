import getImportName from '../utils/getImportName'

const pkg = 'react-fela'
const component = 'Provider'

export default function transformer(file, api) {
  const j = api.jscodeshift

  const importName = getImportName(j, file.source, pkg, component)

  // only transform if FelaTheme is imported from react-fela
  if (importName) {
    let requiresRenaming

    const ast = j(file.source)

    ast.find(j.ImportDeclaration).forEach(path => {
      if (path.node.source.value === pkg) {
        const importDeclaration = path.node.specifiers.find(
          node => node.imported.name === component
        )

        if (importDeclaration) {
          importDeclaration.imported.name = 'RendererProvider'

          if (importDeclaration.local.name === component) {
            requiresRenaming = importDeclaration.local.name
            importDeclaration.local.name = 'RendererProvider'
          }
        }
      }
    })

    if (requiresRenaming) {
      ast.find(j.JSXElement).forEach(path => {
        if (path.node.openingElement.name.name === requiresRenaming) {
          path.node.openingElement.name.name = 'RendererProvider'
        }

        if (path.node.closingElement) {
          path.node.closingElement.name.name = 'RendererProvider'
        }
      })
    }

    return ast.toSource()
  }

  return file.source
}
