import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useFela } from 'react-fela'
import { Box, Spacer } from 'kilvin'
import { MDXProvider } from '@mdx-js/react'

import CodeBlock from './CodeBlock'
import Cross from '../icons/Cross'
import Edit from '../icons/Edit'
import Hamburger from '../icons/Hamburger'
import Heading from './Heading'
import Icon from './Icon'
import Layout from './Layout'
import Link from './Link'
import VisuallyHidden from './VisuallyHidden'

import versions from '../data/versions.json'

function Line({ thickness = 1 }) {
  return (
    <Box
      marginTop={10}
      marginBottom={10}
      height={thickness}
      extend={{ backgroundColor: 'rgb(200, 200, 200)' }}
    />
  )
}

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

function Headings({ headings }) {
  const { theme } = useFela()

  if (headings.length < 2) {
    return null
  }

  return (
    <Box
      as="nav"
      id="secondary-navigation"
      aria-labelledby="toc-title"
      space={2}
      minWidth={200}
      display={['none', , , 'flex']}
      paddingTop={[4, , 8]}
      paddingLeft={5}
      paddingRight={5}
      paddingBottom={12}
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
        huge: {
          left: 'calc(100%  / 2 + 420px)',
        },
      }}>
      <Box
        as="h2"
        marginBottom={4}
        extend={{ fontWeight: 600, fontSize: 16 }}
        id="toc-title">
        Table of Contents
      </Box>

      {headings.map(([heading, id, level]) => (
        <Box paddingLeft={3 * (level - 2)}>
          <Box
            as="a"
            href={'#' + id}
            onClick={() => false}
            extend={{
              textDecoration: 'none',
              color: theme.colors.foreground,
              fontSize: level === 2 ? 14 : 12,
            }}>
            {heading}
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export function Content({ navigationVisible, docsPath, children, ...props }) {
  const { theme } = useFela()
  const router = useRouter()

  return (
    <Box>
      <MDXProvider
        components={{
          a: ({ href, children }) => {
            const isExtern = href.indexOf('http') !== -1
            const isAnchor = href.indexOf('#') === 0
            const resolvedHref = isExtern
              ? href
              : isAnchor
              ? router.pathname + href
              : docsPath + href

            return (
              <Link href={resolvedHref} extern={isExtern}>
                {children}
              </Link>
            )
          },
          pre: ({ children }) => children,
          h1: ({ children }) => <Heading level={1}>{children}</Heading>,
          h2: ({ children }) => <Heading level={2}>{children}</Heading>,
          h3: ({ children }) => <Heading level={3}>{children}</Heading>,
          h4: ({ children }) => <Heading level={4}>{children}</Heading>,
          h5: ({ children }) => <Heading level={5}>{children}</Heading>,
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
              extend={{
                lineHeight: 1.5,
                fontFamily: 'inherit',
                color: theme.colors.foreground,
              }}>
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
              extend={{
                lineHeight: 1.5,
                fontFamily: 'inherit',
                color: theme.colors.foreground,
              }}>
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
          hr: () => <Line />,
        }}>
        <main
          role="main"
          aria-label="Main content"
          id="main"
          style={{ display: navigationVisible ? 'none' : 'block' }}>
          {children}
        </main>
      </MDXProvider>
    </Box>
  )
}

export default function DocLayout({ children, toc, version, headings }) {
  const [navigationVisible, setNavigationVisible] = useState(false)
  const { theme } = useFela()
  const router = useRouter()
  const flatNav = getFlatNav(toc)
  const docsPath = `/docs/${version}/`
  const currentPage = flatNav[router.pathname.substr(docsPath.length)]

  useEffect(() => {
    if (navigationVisible) {
      const handleResize = () => {
        if (window.innerWidth >= 800) {
          setNavigationVisible(false)
        }
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [navigationVisible])

  useEffect(() => {
    const handleRouteChange = (url) => {
      setNavigationVisible(false)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/themes/prism.min.css"
        />
        <link rel="stylesheet" href="/fonts/dank/dmvendor.css" />
        <title>{currentPage} — Fela</title>
      </Head>
      <Box>
        <Box
          space={4}
          display={['flex', , 'none']}
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
            top: 50,
            left: 0,
            right: 0,
          }}>
          <Box
            as="button"
            type="button"
            aria-controls="main-navigation"
            onClick={() => setNavigationVisible(!navigationVisible)}
            extend={{
              cursor: 'pointer',
              height: '100%',
              width: 16,
              background: 'transparent',
              padding: 0,
              border: 0,
              font: 'inherit',
            }}>
            <Icon
              icon={navigationVisible ? Cross : Hamburger}
              label={navigationVisible ? 'Close menu' : 'Open menu'}
            />
          </Box>

          <Box
            as="p"
            grow={1}
            shrink={1}
            extend={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              fontSize: 14,
            }}>
            {currentPage}
          </Box>
          <Link
            href={`https://github.com/robinweser/fela/edit/master/website/pages${router.pathname}.mdx`}>
            Edit <VisuallyHidden>on GitHub</VisuallyHidden>
          </Link>
        </Box>
      </Box>

      <Box
        as="nav"
        id="main-navigation"
        aria-labelledby="nav-title"
        minWidth={['100%', , 250]}
        paddingTop={[4, , 8]}
        paddingLeft={5}
        paddingRight={5}
        paddingBottom={12}
        space={4}
        display={[navigationVisible ? 'flex' : 'none', , 'flex']}
        extend={{
          backgroundColor: 'white',
          overflow: 'auto',
          position: 'fixed',
          zIndex: 3,

          top: 106,
          bottom: 0,
          medium: {
            top: 44,
          },
          huge: {
            right: 'calc(100% / 2 + 400px + 10 * 4px)',
          },
        }}>
        <VisuallyHidden as="h2" id="nav-title">
          Main navigation
        </VisuallyHidden>
        <Box space={2} direction="row" alignItems="center">
          <Box as="label" htmlFor="version" extend={{ fontSize: 14 }}>
            Version
          </Box>
          <Box
            as="select"
            id="version"
            name="version"
            value={version}
            onChange={(e) => {
              router.push(`/docs/${e.target.value}/intro/getting-started`)
            }}>
            {versions.map((version) => (
              <option key={version} value={version}>
                {version}
              </option>
            ))}
          </Box>
        </Box>
        <Box space={[10, , 8]}>
          {Object.keys(toc).map((group) => (
            <Box space={2.5} key={group}>
              <Box
                extend={{
                  fontWeight: 700,
                  fontSize: 18,
                  medium: { fontSize: 16 },
                }}>
                {group}
              </Box>
              <Box paddingLeft={[0, , , 0]} space={2.5}>
                {Object.keys(toc[group]).map((page) => {
                  const path = toc[group][page]

                  if (typeof path === 'object') {
                    return (
                      <Box space={2.5} key={page}>
                        <Box
                          extend={{
                            fontWeight: 700,
                            fontSize: 16,
                            medium: { fontSize: 14 },
                          }}>
                          {page}
                        </Box>
                        <Box paddingLeft={[2, , , 2]} space={2.5}>
                          {Object.keys(path).map((subPage) => {
                            const subPath = path[subPage]
                            const isExtern = subPath.indexOf('http') === 0

                            return (
                              <NextLink
                                key={group + page + subPage}
                                href={isExtern ? subPath : docsPath + subPath}
                                passHref>
                                <Box
                                  as="a"
                                  aria-current={
                                    router.pathname === docsPath + subPath
                                      ? 'page'
                                      : undefined
                                  }
                                  extend={{
                                    textDecoration: 'none',
                                    color:
                                      router.pathname === docsPath + subPath
                                        ? theme.colors.blue
                                        : 'black',
                                    fontSize: 16,
                                    medium: { fontSize: 14 },
                                  }}>
                                  {subPage}
                                </Box>
                              </NextLink>
                            )
                          })}
                        </Box>
                      </Box>
                    )
                  }

                  const isExtern = path.indexOf('http') === 0

                  return (
                    <NextLink
                      key={group + page}
                      href={isExtern ? path : docsPath + path}
                      passHref>
                      <Box
                        as="a"
                        aria-current={
                          router.pathname === docsPath + path
                            ? 'page'
                            : undefined
                        }
                        extend={{
                          textDecoration: 'none',
                          color:
                            router.pathname === docsPath + path
                              ? theme.colors.blue
                              : 'black',
                          fontSize: 16,
                          medium: { fontSize: 14 },
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
          paddingBottom: 80,
          medium: {
            paddingTop: 0,
            paddingLeft: 260,
            paddingRight: 10,
          },
          large: {
            paddingRight: 200 + 10,
            paddingLeft: 250 + 20,
          },
          huge: {
            paddingLeft: 0,
            paddingRight: 0,
          },
        }}>
        <Box
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          paddingTop={[4, , , 8]}
          display={['none', , 'flex']}
          extend={{ fontSize: 14 }}>
          <Box as="p">Docs / {currentPage}</Box>
          <Box as="p">
            <Link
              href={`https://github.com/robinweser/fela/edit/master/website/pages${router.pathname}.mdx`}>
              <Icon icon={Edit} /> Edit on GitHub
            </Link>
          </Box>
        </Box>
        <Spacer size={[4, , 8]} />
        <Content docsPath={docsPath} navigationVisible={navigationVisible}>
          {children}
        </Content>
      </Layout>
      <Headings headings={headings} />
    </>
  )
}
