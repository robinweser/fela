import {
  generateMonolithicClassName,
  arrayReduce,
  objectReduce,
  arrayEach
} from 'fela-utils'

const defaultConfig = {
  precompile: true
}

export default function createPlugin(userConfig = {}) {
  const config = {
    ...defaultConfig,
    ...userConfig
  }

  return ({ types: t, traverse }) => {
    // helper method to extract static style properties from AST objects
    function extractStaticStyle(props, path) {
      const removeQueue = []

      const staticStyle = arrayReduce(
        props,
        (style, node) => {
          const removeCallback = () => props.splice(props.indexOf(node), 1)

          if (
            !node.shorthand &&
            (t.isStringLiteral(node.value) || t.isNumericLiteral(node.value))
          ) {
            removeQueue.push(removeCallback)
            style.push(node)
          } else if (t.isObjectExpression(node.value)) {
            const properties = extractStaticStyle(node.value.properties, path)

            style.push(
              t.objectProperty(node.key, t.objectExpression(properties))
            )

            if (node.value.properties.length === 0) {
              removeQueue.push(removeCallback)
            }
          }

          return style
        },
        []
      )

      removeQueue.forEach(cb => cb())
      return staticStyle
    }

    // helper to transform AST ObjectExpressions into JS objects
    function createStaticJSObject(props, path) {
      return props.reduce((obj, node) => {
        if (
          !node.shorthand &&
          (t.isStringLiteral(node.value) || t.isNumericLiteral(node.value))
        ) {
          obj[node.key.name] = node.value.value
        } else if (t.isObjectExpression(node.value)) {
          obj[node.key.value] = createStaticJSObject(
            node.value.properties,
            path
          )
        }

        return obj
      }, {})
    }

    // abstraction to compile arrow functions, function expressions and function declarations
    function getRuleScope(path) {
      const rule = path.node.arguments[0]
      let ruleDeclaration, functionExpression

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
          // TODO: check if createComponent is imported from *-fela
          if (path.node.callee.name === 'createComponent') {
            const { ruleDeclaration, functionExpression } = getRuleScope(path)

            if (!ruleDeclaration || !functionExpression) {
              // TODO: Warning?
              return false
            }

            let didTraverse
            let renderer

            // pass renderer as second rule parameter if not already happening
            if (
              functionExpression.params &&
              functionExpression.params.length === 0
            ) {
              functionExpression.params.push(t.identifier('_'))
            }

            if (
              functionExpression.params &&
              functionExpression.params.length === 2
            ) {
              if (!t.isIdentifier(functionExpression.params[1])) {
                // TODO: Warning
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

            const traverser = {
              ObjectExpression(childPath) {
                if (!didTraverse) {
                  childPath.node.root = true
                  didTraverse = true
                }

                if (childPath.node.root) {
                  const props = childPath.node.properties
                  const shouldPrecompile = config.renderer && config.precompile

                  let id, blockBody, className
                  let staticStyle = extractStaticStyle(props, childPath)

                  // static style precompilation
                  if (shouldPrecompile) {
                    const felaRenderer = config.renderer()

                    const jsObject = createStaticJSObject(staticStyle)

                    className = felaRenderer.renderRule(() => jsObject)

                    if (className) {
                      id = className.replace(/ /g, '')

                      const blockBodyItems = [
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
                            t.objectExpression([
                              t.objectProperty(
                                t.identifier('type'),
                                t.stringLiteral('PRECOMPILATION')
                              )
                            ])
                          )
                        )
                      ]

                      // rehydrate all cache elements
                      for (const key in felaRenderer.cache) {
                        const cacheEntry = objectReduce(
                          felaRenderer.cache[key],
                          (entry, value, property) => {
                            entry.push(
                              t.objectProperty(
                                t.identifier(property),
                                t.stringLiteral(value)
                              )
                            )
                            return entry
                          },
                          []
                        )

                        blockBodyItems.push(
                          t.ifStatement(
                            t.unaryExpression(
                              '!',
                              t.memberExpression(
                                t.memberExpression(
                                  t.identifier(renderer),
                                  t.identifier('cache')
                                ),
                                t.stringLiteral(key),
                                true
                              )
                            ),
                            t.expressionStatement(
                              t.assignmentExpression(
                                '=',
                                t.memberExpression(
                                  t.memberExpression(
                                    t.identifier(renderer),
                                    t.identifier('cache')
                                  ),
                                  t.stringLiteral(key),
                                  true
                                ),
                                t.objectExpression(cacheEntry)
                              )
                            )
                          )
                        )
                      }

                      blockBody = t.blockStatement(blockBodyItems)
                    }

                    staticStyle = []
                  }

                  // simple static style prerendering
                  if (staticStyle.length > 0) {
                    id = generateMonolithicClassName(staticStyle)

                    blockBody = t.blockStatement([
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
                          t.objectExpression([
                            t.objectProperty(
                              t.identifier('type'),
                              t.stringLiteral('PRERENDERING')
                            ),
                            t.objectProperty(
                              t.identifier('className'),
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
                          ])
                        )
                      )
                    ])
                  }

                  if (id && blockBody) {
                    if (shouldPrecompile) {
                      childPath.node.properties.unshift(
                        t.objectProperty(
                          t.identifier('_className'),
                          t.stringLiteral(className)
                        )
                      )
                    } else {
                      childPath.node.properties.unshift(
                        t.objectProperty(
                          t.identifier('_className'),
                          t.memberExpression(
                            t.memberExpression(
                              t.memberExpression(
                                t.identifier(renderer),
                                t.identifier('cache')
                              ),
                              t.identifier(id)
                            ),
                            t.identifier('className')
                          )
                        )
                      )
                    }

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
