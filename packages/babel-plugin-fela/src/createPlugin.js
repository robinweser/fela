import { generateMonolithicClassName, arrayReduce, arrayEach } from 'fela-utils'

const defaultConfig = {
  precompile: false
}

export default function createPlugin(config = {}) {
  const configWithDefaults = {
    ...defaultConfig,
    ...config
  }

  return ({ types: t, traverse }) => {
    // helper method to extract static style properties from AST objects
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
                t.objectExpression(extractStaticStyle(node.value.properties, path))
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

    // helper to transform AST ObjectExpressions into JS objects
    function createStaticJSObject(props, path) {
      return props.reduce((obj, node) => {
        if (!node.shorthand && (t.isStringLiteral(node.value) || t.isNumericLiteral(node.value))) {
          obj[node.key.name] = node.value.value
        } else if (t.isObjectExpression(node.value)) {
          obj[node.key.value] = createStaticJSObject(node.value.properties, path)
        }

        return obj
      }, {})
    }

    function getRuleScope(path) {
      const rule = path.node.arguments[0]
      let ruleDeclaration,
        functionExpression

      if (t.isIdentifier(rule)) {
        if (path.scope.hasBinding(rule.name)) {
          const binded = path.scope.bindings[rule.name].path

          if (t.isVariableDeclarator(binded) || t.isFunctionDeclaration(binded)) {
            ruleDeclaration = binded
            functionExpression = t.isVariableDeclarator(binded)
              ? ruleDeclaration.node.init
              : ruleDeclaration.node
          }
        }
      } else if (t.isFunctionDeclaration(rule)) {
        ruleDeclaration = rule
        functionExpression = rule.node
      } else if (t.isArrowFunctionExpression(rule) || t.isFunctionExpression(rule)) {
        ruleDeclaration = rule
        functionExpression = rule
      }

      if (t.isArrowFunctionExpression(functionExpression)) {
        if (t.isObjectExpression(functionExpression.body)) {
          functionExpression.body = t.blockStatement([t.returnStatement(functionExpression.body)])

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
            let renderer

            // pass renderer as second rule parameter if not already happening
            if (functionExpression.params && functionExpression.params.length === 0) {
              functionExpression.params.push('_')
            }

            if (functionExpression.params && functionExpression.params.length === 2) {
              if (!t.isIdentifier(functionExpression.params[1])) {
                return
              }

              if (functionExpression.params[1].name !== 'renderer') {
                renderer = functionExpression.params[1].name
              }
            }

            if (functionExpression.params && functionExpression.params.length === 1) {
              functionExpression.params.push(t.identifier('renderer'))
              renderer = 'renderer'
            }

            const traverser = {
              ObjectExpression(childPath) {
                if (!didTraverse) {
                  childPath.node.root = true
                  didTraverse = true
                }

                if (childPath.node.root) {
                  const props = childPath.node.properties

                  let id,
                    blockBody
                  let staticStyle = extractStaticStyle(props, childPath)

                  // static style precompilation
                  if (configWithDefaults.precompile && configWithDefaults.renderer) {
                    const jsObject = createStaticJSObject(staticStyle)

                    const className = configWithDefaults.renderer.renderRule(() => jsObject)

                    if (className) {
                      id = className.replace(/ /g, '')
                      blockBody = t.blockStatement([
                        t.expressionStatement(
                          t.assignmentExpression(
                            '=',
                            t.memberExpression(
                              t.memberExpression(t.identifier(renderer), t.identifier('cache')),
                              t.identifier(id)
                            ),
                            t.stringLiteral(className)
                          )
                        )
                      ])
                    }
                    staticStyle = {}
                  }

                  // simple static style prerendering
                  if (Object.keys(staticStyle).length > 0) {
                    id = generateMonolithicClassName(staticStyle)
                    blockBody = t.blockStatement([
                      t.expressionStatement(
                        t.assignmentExpression(
                          '=',
                          t.memberExpression(
                            t.memberExpression(t.identifier(renderer), t.identifier('cache')),
                            t.identifier(id)
                          ),
                          t.callExpression(
                            t.memberExpression(t.identifier(renderer), t.identifier('renderRule')),
                            [t.ArrowFunctionExpression([], t.objectExpression(staticStyle))]
                          )
                        )
                      )
                    ])
                  }

                  if (id && blockBody) {
                    childPath.node.properties.unshift(
                      t.objectProperty(
                        t.identifier('_className'),
                        t.memberExpression(
                          t.memberExpression(t.identifier(renderer), t.identifier('cache')),
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
                                blockBody
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
