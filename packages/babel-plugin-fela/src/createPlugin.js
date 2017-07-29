import { generateMonolithicClassName, arrayReduce, arrayEach } from 'fela-utils'

export default function createPlugin(config = {}) {
  return ({ types: t, traverse }, file) => {
    function extractStaticStyle(props, path) {
      const staticStyle = arrayReduce(
        props,
        (style, node) => {
          if (
            !node.shorthand &&
            (t.isStringLiteral(node.value) || t.isNumericLiteral(node.value))
          ) {
            style.push(node)
          } else if (t.isObjectExpression(node.value)) {
            style.push(
              t.objectProperty(
                node.key,
                t.objectExpression(
                  extractStaticStyle(node.value.properties, path)
                )
              )
            )
          }

          return style
        },
        []
      )

      arrayEach(staticStyle, prop => {
        if (t.isObjectExpression(prop.value)) {
          if (prop.value.properties.length === 0) {
            props.splice(props.indexOf(prop), 1)
          }
        } else {
          props.splice(props.indexOf(prop), 1)
        }
      })

      return staticStyle
    }

    function getRuleScope(path) {
      const rule = path.node.arguments[0]
      let ruleDeclaration,
        functionExpression

      if (t.isIdentifier(rule)) {
        if (path.scope.hasBinding(rule.name)) {
          const binded = path.scope.bindings[rule.name].path

          if (
            t.isVariableDeclarator(binded) ||
            t.isFunctionDeclaration(binded)
          ) {
            ruleDeclaration = binded
            functionExpression = t.isVariableDeclarator(binded)
              ? ruleDeclaration.node.init
              : ruleDeclaration.node
          }
        }
      } else if (t.isFunctionDeclaration(rule)) {
        ruleDeclaration = rule
        functionExpression = rule.node
      } else if (
        t.isArrowFunctionExpression(rule) ||
        t.isFunctionExpression(rule)
      ) {
        ruleDeclaration = rule
        functionExpression = rule
      }

      if (t.isArrowFunctionExpression(functionExpression)) {
        if (t.isObjectExpression(functionExpression.body)) {
          functionExpression.body = t.blockStatement([
            t.returnStatement(functionExpression.body)
          ])

          if (t.isVariableDeclarator(ruleDeclaration)) {
            ruleDeclaration.node.init = functionExpression
          } else {
            ruleDeclaration.node = functionExpression
          }
        }
      }

      return {
        ruleDeclaration,
        functionExpression
      }
    }

    return {
      visitor: {
        CallExpression(path, parentPath) {
          if ((path.node.callee.name = 'createComponent')) {
            const { ruleDeclaration, functionExpression } = getRuleScope(path)

            if (!ruleDeclaration || !functionExpression) {
              return false
            }

            let didTraverse

            const traverser = {
              ObjectExpression(childPath) {
                if (!didTraverse) {
                  childPath.node.root = true
                  didTraverse = true
                }

                if (childPath.node.root) {
                  const props = childPath.node.properties

                  const staticStyle = extractStaticStyle(props, childPath)

                  if (Object.keys(staticStyle).length > 0) {
                    const id = generateMonolithicClassName(staticStyle)

                    let renderer

                    if (
                      functionExpression.params &&
                      functionExpression.params.length === 0
                    ) {
                      functionExpression.params.push('_')
                    }

                    if (
                      functionExpression.params &&
                      functionExpression.params.length === 2
                    ) {
                      if (!t.isIdentifier(functionExpression.params[1])) {
                        return
                      }

                      if (functionExpression.params[1].name !== 'renderer') {
                        renderer = functionExpression.params[1].name
                      }
                    }

                    if (
                      functionExpression.params &&
                      functionExpression.params.length === 1
                    ) {
                      functionExpression.params.push(t.identifier('renderer'))
                      renderer = 'renderer'
                    }

                    childPath.node.properties.unshift(
                      t.objectProperty(
                        t.identifier('_className'),
                        t.memberExpression(
                          t.memberExpression(
                            t.identifier(renderer),
                            t.identifier('cache')
                          ),
                          t.identifier(id)
                        )
                      )
                    )

                    let isRoot

                    traverse(
                      functionExpression,
                      {
                        BlockStatement(bPath) {
                          if (!isRoot) {
                            isRoot = true

                            bPath.node.body.unshift(
                              t.ifStatement(
                                t.unaryExpression(
                                  '!',
                                  t.memberExpression(
                                    t.memberExpression(
                                      t.identifier(renderer),
                                      t.identifier('cache')
                                    ),
                                    t.identifier(id)
                                  )
                                ),
                                t.blockStatement([
                                  t.expressionStatement(
                                    t.assignmentExpression(
                                      '=',
                                      t.memberExpression(
                                        t.memberExpression(
                                          t.identifier(renderer),
                                          t.identifier('cache')
                                        ),
                                        t.identifier(id)
                                      ),
                                      t.callExpression(
                                        t.memberExpression(
                                          t.identifier(renderer),
                                          t.identifier('renderRule')
                                        ),
                                        [
                                          t.ArrowFunctionExpression(
                                            [],
                                            t.objectExpression(staticStyle)
                                          )
                                        ]
                                      )
                                    )
                                  )
                                ])
                              )
                            )
                          }
                        }
                      },
                      childPath.scope,
                      childPath
                    )
                  }
                }
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
}
