import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useFela } from 'react-fela'
import { Box, Spacer, Grid } from 'kilvin'
import { MDXRemote } from 'next-mdx-remote'

import CodeBlock from './CodeBlock'
import Cross from '../icons/Cross'
import Edit from '../icons/Edit'
import Hamburger from '../icons/Hamburger'
import Heading from './Heading'
import Icon from './Icon'
import Layout from './Layout'
import Link from './Link'
import VisuallyHidden from './VisuallyHidden'

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

const NAV_WIDTH = 240

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
      display={['none', , , 'flex']}
      paddingTop={8}
      paddingBottom={12}
      maxHeight="calc(100vh - 70px)"
      width={200}
      extend={{
        zIndex: 1,
        backgroundColor: 'white',
        overflow: 'auto',
        position: 'fixed',
        right: 0,
        top: 70,
        '@media (min-width: 1300px)': {
          marginLeft: 1300 - 200,
          right: 'unset',
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

export function Content({ docsPath, children }) {
  const router = useRouter()
  const { theme } = useFela()

  return (
    <Box as="main" role="main" aria-label="Main content" id="main">
      <MDXRemote
        {...children}
        lazy
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
        }}
      />
    </Box>
  )
}

function NavigationItem({ path, group, page, docsPath }) {
  const router = useRouter()

  const isExtern = path.indexOf('http') === 0
  const isCurrentPage = router.asPath === docsPath + path

  return (
    <NextLink key={group + page} href={isExtern ? path : docsPath + path}>
      <Box
        as="a"
        key={group + page}
        href={isExtern ? path : docsPath + path}
        aria-current={isCurrentPage ? page : undefined}
        extend={{
          color: 'black',
          wordBreak: 'break-word',
          fontSize: 16,
          padding: 12,
          borderRadius: 4,
          backgroundColor: isCurrentPage ? 'rgb(220, 220, 220)' : 'transparent',
          textDecoration: 'none',
          large: {
            padding: 8,
          },
        }}>
        {page}
      </Box>
    </NextLink>
  )
}

export default function DocLayout({ children, toc, version, headings }) {
  const [navigationVisible, setNavigationVisible] = useState(false)
  const { theme } = useFela()
  const router = useRouter()
  const flatNav = getFlatNav(toc)
  const docsPath = `/docs/${version}/`

  const currentPage =
    flatNav[router.asPath.substr(docsPath.length).split('#')[0]]

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
          display={['none', , , 'flex']}
          extend={{
            backgroundColor: 'rgb(245, 245, 245)',
            position: 'fixed',
            width: 20,
            '@media (min-width: 1300px)': {
              width: 'calc((100% - 1300px) / 2 + 30px)',
            },
            zIndex: -1,
            left: 0,
            top: 0,
            bottom: 0,
          }}
        />
        <Layout>
          <Grid
            columns={['100%', , , NAV_WIDTH + 'px auto 200px']}
            gap={[0, , , 10]}>
            <Box
              as="nav"
              id="main-navigation"
              aria-labelledby="nav-title"
              paddingTop={8}
              paddingRight={[8, , , 5]}
              paddingBottom={[8, , , 12]}
              paddingLeft={[8, , , 0]}
              maxHeight={['100%', , , 'calc(100% - 70px)']}
              width={['100%', , , NAV_WIDTH]}
              display={[navigationVisible ? 'flex' : 'none', , , 'flex']}
              extend={{
                backgroundColor: 'rgb(245, 245, 245)',
                left: 0,
                right: 0,
                zIndex: 20,
                position: 'fixed',
                bottom: 0,
                overflow: 'auto',
                large: {
                  top: 70,
                  left: 'unset',
                  right: 'unset',
                },
              }}>
              <VisuallyHidden as="h2" id="nav-title">
                Main navigation
              </VisuallyHidden>
              <Box
                as="button"
                type="button"
                aria-controls="main-navigation"
                width={50}
                height={50}
                alignItems="center"
                justifyContent="center"
                onClick={() => setNavigationVisible(false)}
                extend={{
                  cursor: 'pointer',
                  background: 'transparent',
                  padding: 0,
                  border: 0,
                  right: 10,
                  top: 10,
                  position: 'fixed',
                  font: 'inherit',
                }}>
                <Icon
                  icon={Cross}
                  label="Close menu"
                  extend={{
                    fontSize: 24,
                  }}
                />
              </Box>
              <Box space={4} paddingTop={[5, , , 0]}>
                <Box space={10}>
                  {Object.keys(toc).map((group) => (
                    <Box space={2.5} key={group}>
                      <Box>{group}</Box>
                      <Box>
                        {Object.keys(toc[group]).map((page) => {
                          const path = toc[group][page]

                          if (typeof path === 'object') {
                            return (
                              <Box space={1} paddingTop={4} key={page}>
                                <Box>{page}</Box>
                                <Box>
                                  {Object.keys(path).map((page) => (
                                    <NavigationItem
                                      key={group + page}
                                      page={page}
                                      group={group}
                                      path={path[page]}
                                      docsPath={docsPath}
                                    />
                                  ))}
                                </Box>
                              </Box>
                            )
                          }

                          return (
                            <NavigationItem
                              key={path}
                              path={path}
                              group={group}
                              page={page}
                              docsPath={docsPath}
                            />
                          )
                        })}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            <Box />
            <Box paddingTop={[0, , , 8]} paddingBottom={15}>
              <Box
                space={1}
                direction="row"
                alignItems="center"
                paddingBottom={3}
                display={['flex', , , 'none']}
                marginLeft={-2.5}>
                <Box
                  as="button"
                  type="button"
                  aria-controls="main-navigation"
                  width={50}
                  height={50}
                  alignItems="center"
                  justifyContent="center"
                  onClick={() => setNavigationVisible(true)}
                  extend={{
                    cursor: 'pointer',
                    background: 'transparent',
                    padding: 0,
                    border: 0,
                    font: 'inherit',
                  }}>
                  <Icon
                    icon={Hamburger}
                    label="Close menu"
                    extend={{
                      fontSize: 24,
                    }}
                  />
                </Box>

                <Box
                  extend={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}>
                  {currentPage}
                </Box>
                <Box grow={1} />

                <Box direction="row" as="span">
                  <Link
                    href={`https://github.com/robinweser/fela/edit/master/website/pages${router.pathname}.mdx`}>
                    <Icon icon={Edit} /> Edit
                    <Box as="span" display={['none', , , 'flex']}>
                      {' '}
                      on GitHub
                    </Box>
                  </Link>
                </Box>
              </Box>
              <Content docsPath={docsPath}>{children}</Content>
            </Box>
            <Headings headings={headings} />
          </Grid>
        </Layout>
      </Box>
    </>
  )
}
