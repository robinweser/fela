import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useFela } from 'react-fela'
import { Box, Spacer } from 'kilvin'
import { MDXProvider } from '@mdx-js/react'

import Link from './Link'
import CodeBlock from './CodeBlock'
import NavItem from './NavItem'
import Template from './Template'
import Layout from './Layout'

import nav from '../toc.json'

function getFlatNav(nav, flat = {}, prefix = '') {
  Object.keys(nav).forEach((title) => {
    const subNav = nav[title]

    if (typeof subNav === 'object') {
      getFlatNav(subNav, flat, prefix + title + ' / ')
    } else {
      flat[subNav] = prefix + title
    }
  })

  return flat
}

const flatNav = getFlatNav(nav)

function beautifyId(text) {
  return text.replace(/ /gi, '-').toLowerCase()
}

function getId(children, level, fixedId) {
  if (fixedId) {
    return fixedId
  }

  return typeof children === 'string' && level > 1
    ? encodeURI(beautifyId(children))
    : undefined
}

function getFixedId(children) {
  if (typeof children === 'string' && children.indexOf(';;') !== 0) {
    const [text, fixedId] = children.split(';;')

    if (fixedId && fixedId.length > 0) {
      return [text, fixedId]
    }
  }

  return [children]
}

function Heading({ level, children, otherProps, addHeading }) {
  const { theme } = useFela()
  const router = useRouter()

  const [text, fixedId] = getFixedId(children)
  const id = getId(children, level, fixedId)

  useEffect(() => {
    if (addHeading) {
      addHeading([text, id, level])
    }
  }, [id])

  return (
    <Box
      as={'h' + level}
      onClick={() => {
        if (id) {
          window.location.hash = id
        }
      }}
      extend={{
        display: 'block',
        cursor: id ? 'pointer' : 'inherit',
        marginTop: (level === 1 ? 0 : 22) + (level === 2 ? 26 : 0),
        marginBottom: level === 1 ? 30 : 10,
        lineHeight: 1.0,
        fontWeight: level === 1 ? 700 : level === 2 ? 500 : 600,
        '> a': {
          color: theme.colors.foreground,
        },
      }}>
      <Box as="span" id={id} extend={{ marginTop: -80, paddingBottom: 80 }} />
      {text}
    </Box>
  )
}

function Headings({ headings }) {
  const { theme } = useFela()

  return (
    <Box
      maxWidth={[0, , 260, 300]}
      minWidth={[0, , 260, 300]}
      space={2}
      paddingTop={[4, , 8]}
      paddingRight={5}
      paddingBottom={12}
      display={['none', , 'flex']}
      extend={{
        backgroundColor: 'white',
        overflow: 'auto',
        position: 'fixed',

        zIndex: 3,
        right: 0,
        bottom: 0,
        medium: {
          top: 44,
        },
      }}>
      {headings.map(([heading, id, level]) => (
        <Box paddingLeft={3 * (level - 2)}>
          <NextLink href={'#' + id} passHref>
            <Box
              as="a"
              extend={{
                textDecoration: 'none',
                color: theme.colors.foreground,
                fontSize: level === 2 ? 14 : 12,
              }}>
              {heading}
            </Box>
          </NextLink>
        </Box>
      ))}
    </Box>
  )
}

function Content({ navigationVisible, children, addHeading }) {
  const { theme } = useFela()

  return (
    <Box paddingTop={[2, , , 8]} paddingBottom={20}>
      <MDXProvider
        components={{
          a: Link,
          pre: ({ children }) => children,
          h1: ({ children }) => <Heading level={1}>{children}</Heading>,
          h2: ({ children }) => (
            <Heading level={2} addHeading={addHeading}>
              {children}
            </Heading>
          ),
          h3: ({ children }) => (
            <Heading level={3} addHeading={addHeading}>
              {children}
            </Heading>
          ),
          h4: ({ children }) => (
            <Heading level={4} addHeading={addHeading}>
              {children}
            </Heading>
          ),
          h5: ({ children }) => (
            <Heading level={5} addHeading={addHeading}>
              {children}
            </Heading>
          ),
          strong: ({ children }) => (
            <Box as="strong" extend={{ display: 'inline', fontWeight: 500 }}>
              {children}
            </Box>
          ),

          ul: ({ children }) => (
            <Box
              as="ul"
              space={1}
              marginTop={2.5}
              marginBottom={2.5}
              paddingLeft={4.5}
              extend={{ lineHeight: 1.5 }}>
              {children}
            </Box>
          ),
          ol: ({ children }) => (
            <Box
              as="ol"
              space={1}
              marginTop={2.5}
              marginBottom={2.5}
              paddingLeft={6}
              extend={{ lineHeight: 1.5 }}>
              {children}
            </Box>
          ),

          blockquote: ({ children }) => (
            <Box
              paddingLeft={3}
              paddingTop={2}
              paddingRight={2}
              paddingBottom={2}
              extend={{
                borderLeftWidth: 6,
                borderLeftStyle: 'solid',
                borderLeftColor: theme.colors.cyan,
                backgroundColor: theme.colors.cyanTransparent,

                margin: '5px 0 15px',
                '& p': {
                  marginBottom: 0,
                  marginTop: 0,
                },
                '& pre': {
                  backgroundColor: theme.colors.cyanCode,
                },
              }}>
              {children}
            </Box>
          ),
          code: CodeBlock,
          inlineCode: ({ children }) => (
            <Box
              as="pre"
              paddingLeft={1.5}
              paddingRight={1.5}
              extend={{
                display: 'inline-flex',
                backgroundColor: theme.colors.background,
              }}>
              <Box
                as="code"
                extend={{
                  fontSize: 16,
                  fontFamily:
                    'dm, Dank, Dank Mono, Fira Code, Hack, Consolas, monospace',
                  textRendering: 'optimizeLegibility',
                }}>
                {children}
              </Box>
            </Box>
          ),
          p: ({ children }) => (
            <Box
              as="p"
              marginTop={1}
              marginBottom={3}
              extend={{
                display: 'inline-block',
                fontSize: 16,
                lineHeight: 1.5,
                color: theme.colors.foreground,
              }}>
              {children}
            </Box>
          ),
          img: ({ src, title, alt }) => (
            <Box
              as="img"
              maxWidth="100%"
              extend={{ display: 'block' }}
              src={src.indexOf('http') !== -1 ? src : '/images/' + src}
            />
          ),
          tr: ({ children }) => (
            <Box
              as="tr"
              display="table-row"
              extend={{
                border: 0,
              }}>
              {children}
            </Box>
          ),
          td: ({ children }) => (
            <Box
              as="td"
              display="table-cell"
              padding={2.5}
              extend={{
                textAlign: 'left',
                overflow: 'auto',

                lineHeight: 1.4,
                borderTopWidth: 1,
                borderLeftWidth: 1,
                borderBottomWidth: 0,
                borderRightWidth: 0,
                borderStyle: 'solid',
                borderColor: theme.colors.border,
                ':first-child': {
                  borderLeftWidth: 0,
                },
              }}>
              {children}
            </Box>
          ),
          th: ({ children }) => (
            <Box
              as="th"
              padding={2}
              display="table-cell"
              extend={{
                textAlign: 'left',
                overflow: 'auto',
                lineHeight: 1.4,

                borderLeftWidth: 1,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderRightWidth: 0,
                borderStyle: 'solid',
                fontWeight: 600,
                borderColor: theme.colors.border,
                ':first-child': {
                  borderLeftWidth: 0,
                },
              }}>
              {children}
            </Box>
          ),
          table: ({ children }) => (
            <Box extend={{ overflow: 'auto' }}>
              <Box
                as="table"
                display="table"
                marginTop={1}
                width="100%"
                extend={{ borderCollapse: 'collapse' }}>
                {children}
              </Box>
            </Box>
          ),
          hr: () => (
            <Box
              marginTop={10}
              marginBottom={10}
              height={1}
              extend={{ backgroundColor: 'rgb(200, 200, 200)' }}
            />
          ),
        }}>
        <main style={{ display: navigationVisible ? 'none' : 'block' }}>
          {children}
        </main>
      </MDXProvider>
    </Box>
  )
}

export default function DocLayout({ children }) {
  const [navigationVisible, setNavigationVisible] = useState(false)
  const [headings, setHeadings] = useState([])
  const { theme } = useFela()
  const router = useRouter()

  const addHeading = (heading) => {
    setHeadings((headings) => {
      const exists = headings.find((h) => h[1] === heading[1])

      if (!exists) {
        return [...headings, heading]
      }
      return headings
    })
  }

  const currentPage = flatNav[router.pathname.substr(6)]

  useEffect(() => {
    const handleRouteChange = (url) => {
      setNavigationVisible(false)
      setHeadings([])
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
    <Template>
      <Box>
        <Box
          space={4}
          display={['flex', , 'none']}
          padding={[5, , 4]}
          paddingLeft={[5, , 4]}
          paddingRight={[5, , 4]}
          paddingTop={[4.5, , 4]}
          paddingBottom={[4.5, , 4]}
          direction="row"
          alignItems="center"
          extend={{
            backgroundColor: theme.colors.background,
            position: 'fixed',
            zIndex: 5,
            top: 48,
            left: 0,
            right: 0,
          }}>
          <Box
            onClick={() => setNavigationVisible(!navigationVisible)}
            extend={{ cursor: 'pointer', height: '100%', width: 16 }}>
            <i className={'fas fa-' + (navigationVisible ? 'times' : 'bars')} />
          </Box>
          <Box>{currentPage}</Box>
        </Box>
      </Box>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/themes/prism.min.css"
        />
        <link rel="stylesheet" href="/fonts/dank/dmvendor.css" />
        <title>Fela - {currentPage}</title>
      </Head>
      <Box
        minWidth={['100%', , 280]}
        paddingTop={[4, , 8]}
        paddingLeft={5}
        paddingRight={5}
        paddingBottom={12}
        display={[navigationVisible ? 'flex' : 'none', , 'flex']}
        extend={{
          backgroundColor: 'white',
          overflow: 'auto',
          position: 'fixed',
          zIndex: 3,
          left: 0,
          top: 108,
          bottom: 0,
          medium: {
            backgroundColor: theme.colors.background,
            top: 44,
          },
        }}>
        <Box space={8}>
          {Object.keys(nav).map((group) => (
            <Box space={2.5} key={group}>
              <Box extend={{ fontWeight: 700 }}>{group}</Box>
              <Box paddingLeft={4} space={2.5}>
                {Object.keys(nav[group]).map((page) => {
                  if (typeof nav[group][page] === 'object') {
                    return (
                      <Box space={2.5} key={page}>
                        <Box extend={{ fontWeight: 700, fontSize: 14 }}>
                          {page}
                        </Box>
                        <Box paddingLeft={4} space={2.5}>
                          {Object.keys(nav[group][page]).map((subPage) => (
                            <NextLink
                              key={group + page + subPage}
                              href={'/docs/' + nav[group][page][subPage]}
                              passHref>
                              <Box
                                as="a"
                                extend={{
                                  textDecoration: 'none',
                                  fontSize: 14,
                                  color:
                                    router.pathname ===
                                    '/docs/' + nav[group][page][subPage]
                                      ? theme.colors.blue
                                      : 'black',
                                }}>
                                {subPage}
                              </Box>
                            </NextLink>
                          ))}
                        </Box>
                      </Box>
                    )
                  }

                  return (
                    <NextLink
                      key={group + page}
                      href={'/docs/' + nav[group][page]}
                      passHref>
                      <Box
                        as="a"
                        extend={{
                          textDecoration: 'none',
                          fontSize: 14,
                          color:
                            router.pathname === '/docs/' + nav[group][page]
                              ? theme.colors.blue
                              : 'black',
                        }}>
                        {page}
                      </Box>
                    </NextLink>
                  )
                })}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Layout
        extend={{
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 44,
          medium: {
            paddingLeft: 300,
            paddingRight: 280,
            paddingTop: 0,
          },
          large: {
            paddingLeft: 320,
            paddingRight: 320,
          },
          '@media (min-width: 1500px)': {
            paddingLeft: 0,
            paddingRight: 0,
          },
        }}>
        <Content navigationVisible={navigationVisible} addHeading={addHeading}>
          {children}
        </Content>
      </Layout>
      <Headings headings={headings} />
    </Template>
  )
}
