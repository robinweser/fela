export default function getImportName(j, source, pkg, component) {
  let importName

  j(source)
    .find(j.ImportDeclaration)
    .forEach(path => {
      if (path.node.source.value === pkg) {
        const importDeclaration = path.node.specifiers.find(
          node => node.imported.name === component
        )

        if (importDeclaration) {
          importName = importDeclaration.local.name
        }
      }
    })

  return importName
}
