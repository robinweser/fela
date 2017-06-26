function generateHashCode(str) {
  let hash = 0
  let iterator
  let char
  const length = str.length

  if (length === 0) {
    return hash
  }

  for (iterator = 0; iterator < length; ++iterator) {
    char = str.charCodeAt(iterator)
    hash = (hash << 5) - hash + char
    hash |= 0
  }

  return hash.toString(36)
}

export default function ({ types }, file) {
  const {
    identifier,
    isIdentifier,
    isVariableDeclarator,
    isStringLiteral,
    isNumericLiteral,
    isObjectExpression
  } = types

  function createStaticJSObject(props, path) {
    return props.reduce((obj, node) => {
      if (
        !node.shorthand &&
        (isStringLiteral(node.value) || isNumericLiteral(node.value))
      ) {
        obj[node.key.name] = node.value.value
        node.shouldRemove = true
      } else if (isObjectExpression(node.value)) {
        obj[node.key.value] = createStaticJSObject(node.value.properties, path)
        if (
          node.value.properties.filter(
            node => !node.hasOwnProperty('shouldRemove')
          ).length === 0
        ) {
          node.shouldRemove = true
        }
      }

      return obj
    }, {})
  }

  return {
    visitor: {
      CallExpression(path) {
        if ((path.node.callee.name = 'createComponent')) {
          const rule = path.node.arguments[0]

          if (isIdentifier(rule)) {
            if (path.scope.hasBinding(rule.name)) {
              const ruleDeclaration = path.scope.bindings[rule.name].path

              if (isVariableDeclarator(ruleDeclaration)) {
                let id,
                  didTraverse

                ruleDeclaration.traverse({
                  ObjectExpression(childPath) {
                    if (!didTraverse) {
                      childPath.node.root = true
                      didTraverse = true
                    }

                    if (childPath.node.root) {
                      const props = childPath.node.properties

                      const jsObject = createStaticJSObject(props, childPath)
                      id = `_${generateHashCode(JSON.stringify(jsObject))}`

                      childPath.node.properties.unshift(
                        `_className: renderer.precompiled.${id}`
                      )

                      ruleDeclaration.traverse({
                        BlockStatement(bPath) {
                          bPath.node.body
                            .unshift(`if (!renderer.precompiled.${id}) {
  renderer.precompiled.${id} = renderer.renderRule(() => (${JSON.stringify(jsObject, null, 2)}))
}`)
                        },
                        ArrowFunctionExpression(aPath) {
                          if (aPath.node.params.length === 1) {
                            aPath.node.params.push(identifier('renderer'))
                          }
                        }
                      })
                    }

                    childPath.traverse({
                      ObjectProperty(p) {
                        if (p.node.shouldRemove) {
                          p.remove(p.node)
                        }
                      }
                    })
                  }
                })
              }
            }
          }
        }
      }
    }
  }
}
