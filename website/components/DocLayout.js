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
import Heading from './Heading'
import versions from '../versions.json'

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

  return (
    <Box
      maxWidth={[0, , 260, 280]}
      minWidth={[0, , 260, 280]}
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

export function Content({ navigationVisible, docsPath, children, ...props }) {
  const { theme } = useFela()

  return (
    <Box>
      <MDXProvider
        components={{
          a: ({ href, children }) => {
            const isExtern = href.indexOf('http') !== -1
            const resolvedHref = isExtern ? href : docsPath + href

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
          hr: () => <Line />,
        }}>
        <main style={{ display: navigationVisible ? 'none' : 'block' }}>
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
        <title>Fela - {currentPage}</title>
      </Head>
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
            top: 50,
            left: 0,
            right: 0,
          }}>
          <Box
            onClick={() => setNavigationVisible(!navigationVisible)}
            extend={{ cursor: 'pointer', height: '100%', width: 16 }}>
            <i className={'fas fa-' + (navigationVisible ? 'times' : 'bars')} />
          </Box>

          <Box
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
            href={`https://github.com/robinweser/fela/edit/new-website/website/pages${router.pathname}.mdx`}>
            Edit
          </Link>
        </Box>
      </Box>

      <Box
        minWidth={['100%', , 260]}
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
          left: 0,
          top: 106,
          bottom: 0,
          medium: {
            backgroundColor: theme.colors.background,
            top: 44,
          },
        }}>
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
              router.push(`/docs/${e.target.value}/intro/motivation`)
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
                  if (typeof toc[group][page] === 'object') {
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
                        <Box paddingLeft={[2, , , 4]} space={2.5}>
                          {Object.keys(toc[group][page]).map((subPage) => (
                            <NextLink
                              key={group + page + subPage}
                              href={docsPath + toc[group][page][subPage]}
                              passHref>
                              <Box
                                as="a"
                                extend={{
                                  textDecoration: 'none',
                                  color:
                                    router.pathname ===
                                    docsPath + toc[group][page][subPage]
                                      ? theme.colors.blue
                                      : 'black',
                                  fontSize: 16,
                                  medium: { fontSize: 14 },
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
                      href={docsPath + toc[group][page]}
                      passHref>
                      <Box
                        as="a"
                        extend={{
                          textDecoration: 'none',
                          color:
                            router.pathname === docsPath + toc[group][page]
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
            paddingLeft: 280,
            paddingRight: 280,
            paddingTop: 0,
          },
          large: {
            paddingLeft: 300,
            paddingRight: 320,
          },
          '@media (min-width: 1500px)': {
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
          <Box>Docs / {currentPage}</Box>
          <Box>
            <Link
              href={`https://github.com/robinweser/fela/edit/new-website/website/pages${router.pathname}.mdx`}>
              <i className="fa fa-edit" /> Edit on GitHub
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
