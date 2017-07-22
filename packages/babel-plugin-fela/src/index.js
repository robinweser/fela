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

export default function({ types, traverse }, file) {
  const {
    identifier,
    blockStatement,
    returnStatement,
    objectProperty,
    binaryExpression,
    isIdentifier,
    isVariableDeclarator,
    isStringLiteral,
    isNumericLiteral,
    isObjectExpression,
    isArrowFunctionExpression,
    isFunctionExpression,
    isFunctionDeclaration,
    isReturnStatement,
    isBlockStatement
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
      CallExpression(path, parentPath) {
        if ((path.node.callee.name = 'createComponent')) {
          const rule = path.node.arguments[0]

          let ruleDeclaration, func

          console.log(rule)
          if (isIdentifier(rule)) {
            if (path.scope.hasBinding(rule.name)) {
              const binded = path.scope.bindings[rule.name].path

              if (
                isVariableDeclarator(binded) ||
                isFunctionDeclaration(binded)
              ) {
                ruleDeclaration = binded
                func = isVariableDeclarator(binded)
                  ? ruleDeclaration.node.init
                  : ruleDeclaration.node
              } else {
                return
              }
            } else {
              return
            }
          } else if (isFunctionDeclaration(rule)) {
            ruleDeclaration = rule
            func = rule.node
          } else if (
            isArrowFunctionExpression(rule) ||
            isFunctionExpression(rule)
          ) {
            ruleDeclaration = rule
            func = rule
          } else {
            return
          }

          if (func.params && func.params.length === 0) {
            func.params.push('_')
          }
          if (func.params && func.params.length === 1) {
            func.params.push(identifier('renderer'))
          }

          if (
            func.params &&
            func.params.length === 2 &&
            (!isIdentifier(func.params[1]) ||
              func.params[1].name !== 'renderer')
          ) {
            console.log('SHIT')
            return
          }

          if (isArrowFunctionExpression(func)) {
            console.log('ISARROW')

            if (isObjectExpression(func.body)) {
              console.log('ISOBJECT')

              func.body = blockStatement([returnStatement(func.body)])

              if (isVariableDeclarator(ruleDeclaration)) {
                ruleDeclaration.node.init = func
              } else {
                ruleDeclaration.node = func
              }
            }
          }

          let id, didTraverse

          const traverser = {
            ObjectExpression(childPath) {
              if (!didTraverse) {
                childPath.node.root = true
                didTraverse = true
              }

              if (childPath.node.root) {
                const props = childPath.node.properties

                const jsObject = createStaticJSObject(props, childPath)
                id = '_' + generateHashCode(JSON.stringify(jsObject))

                childPath.node.properties.unshift(
                  '_className: renderer.precompiled.' + id
                )

                traverse(
                  func,
                  {
                    BlockStatement(bPath) {
                      bPath.node.body
                        .unshift(`if (!renderer.precompiled.${id}) {
  renderer.precompiled.${id} = renderer.renderRule(() => (${JSON.stringify(
                        jsObject,
                        null,
                        2
                      )}))
}`)
                    }
                  },
                  childPath.scope,
                  childPath
                )
              }

              childPath.traverse({
                ObjectProperty(p) {
                  if (p.node.shouldRemove) {
                    p.remove(p.node)
                  }
                }
              })
            }
          }

          if (ruleDeclaration.traverse) {
            ruleDeclaration.traverse(traverser)
          } else {
            traverse(ruleDeclaration, traverser, path.scope, path)
          }
        }
      }
    }
  }
}
