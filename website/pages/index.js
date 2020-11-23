import React from 'react'
import { Box } from 'kilvin'
import Head from 'next/head'
import { useFela } from 'react-fela'

import Template from '../components/Template'
import Layout from '../components/Layout'
import CodeBlock from '../components/CodeBlock'
import Button from '../components/Button'

import companies from '../companies.json'

export default () => {
  const { theme } = useFela()

  return (
    <Template>
      <Head>
        <title>Fela</title>
      </Head>
      <Box
        paddingTop={15}
        paddingBottom={10}
        paddingLeft={5}
        paddingRight={5}
        space={[2, , , 8]}
        extend={{ backgroundColor: theme.colors.background }}>
        <Box
          as="img"
          width="100%"
          alignSelf="center"
          maxWidth={[300, , 500, , 550]}
          src="/logo.svg"
        />
        <Box
          alignSelf="center"
          paddingTop={10}
          minWidth={['100%', 350]}
          direction={['column', 'row']}
          space={3}>
          <Button href="/docs/intro/motivation">Documentation</Button>
          <Button href="https://github.com/robinweser/fela" variant="secondary">
            Github
          </Button>
        </Box>
      </Box>

      <Box
        paddingLeft={[0, , 12]}
        paddingRight={[0, , 12]}
        paddingTop={[6, , 15]}
        paddingBottom={[10, , 20]}>
        <Layout>
          <Box space={[10, , 15]}>
            <Box direction={['column', , 'row']} space={[10, , 15]} wrap="wrap">
              <Box grow={1} shrink={0} basis={['auto', , 0]} space={1.5}>
                <Box extend={{ fontSize: 20, fontWeight: 500 }}>
                  Predictable Styling
                </Box>
                <Box as="p" extend={{ lineHeight: 1.5 }}>
                  Fela generates unique CSS classes for every rule.
                  <br />
                  It automatically sorts rules, pseudo classes and media
                  queries. This prevents global namespace and specificity
                  conflicts and ensures predictabiity.
                  <br />
                  You always get the styles you write.
                </Box>
              </Box>
              <Box grow={1} shrink={0} basis={['auto', , 0]} space={1.5}>
                <Box extend={{ fontSize: 20, fontWeight: 500 }}>Atomic CSS</Box>
                <Box as="p" extend={{ lineHeight: 1.5 }}>
                  Fela generates atomic CSS classes.
                  <br />
                  For every property-value pair there's a single rule which can
                  be reused across your whole application. This limits the
                  amount of rendered CSS and ensures reusability.
                  <br />
                  You only get the styles you actually need.
                </Box>
              </Box>
            </Box>
            <Box direction={['column', , 'row']} space={[10, , 15]} wrap="wrap">
              <Box grow={1} shrink={0} basis={['auto', , 0]} space={1.5}>
                <Box extend={{ fontSize: 20, fontWeight: 500 }}>
                  Framework-agnostic
                </Box>
                <Box as="p" extend={{ lineHeight: 1.5 }}>
                  Fela is a plain JavaScript library and works without a
                  framework our UI library.
                  <br />
                  It ships several bindings for popular tools such as React, Vue
                  or ReasonML amongst others.
                  <br />
                  You choose the stack you want.
                </Box>
              </Box>
              <Box grow={1} shrink={0} basis={['auto', , 0]} space={1.5}>
                <Box extend={{ fontSize: 20, fontWeight: 500 }}>
                  Huge Ecosystem
                </Box>
                <Box as="p" extend={{ lineHeight: 1.5 }}>
                  With only ~4kb minfied and gzipped, Fela is a lightweight
                  styling toolbelt.
                  <br />
                  Yet, it ships with a huge ecosystem consisting of dozens of
                  plugins, enhancers and third-party packages.
                  <br />
                  You choose the extensions you need.
                </Box>
              </Box>
            </Box>
            <Box
              as="a"
              href="/docs/intro/benefits"
              extend={{
                display: 'inline-flex',
                alignSelf: 'flex-start',
                color: theme.colors.blue,
                textDecoration: 'none',
                borderBottomWidth: 2,
                borderBottomStyle: 'solid',
                borderBottomColor: theme.colors.blue,
              }}>
              Read about all the benefits →
            </Box>
          </Box>
        </Layout>
      </Box>
      <Box
        paddingLeft={[0, , 12]}
        paddingRight={[0, , 12]}
        paddingTop={[6, , 15]}
        paddingBottom={[10, , 20]}
        space={5}
        extend={{ backgroundColor: theme.colors.background }}>
        <Box
          as="h2"
          alignSelf="center"
          extend={{
            fontSize: 26,
            fontWeight: 500,
          }}>
          Companies using Fela
        </Box>
        <Box
          as="p"
          alignSelf="center"
          extend={{ lineHeight: 1.5, textAlign: 'center' }}>
          These companies amongst others rely on Fela for the apps and websites.
          <br />
          Many actively contribute back or even sponsor the project!
        </Box>
        <Box
          alignItems="center"
          justifyContent="center"
          direction="row"
          wrap="wrap"
          paddingTop={8}>
          {Object.keys(companies).map((name) => {
            const data = companies[name]

            let url = typeof data === 'object' ? data.url : data

            return (
              <Box
                as="a"
                href={url}
                padding={3}
                margin={3}
                maxWidth={200}
                maxHeight={100}
                width="100%"
                alignItems="center"
                extend={{
                  textDecoration: 'none',
                  color: theme.colors.blue,
                  fontSize: 20,
                  borderRadius: 4,
                }}>
                {typeof data === 'object' ? (
                  <Box
                    as="img"
                    src={'/companies/' + data.logo}
                    alt={name + ' Logo'}
                    maxHeight={100 - 2 * 3 * 4}
                    maxWidth={200 - 2 * 3 * 4}
                  />
                ) : (
                  name
                )}
              </Box>
            )
          })}
        </Box>
      </Box>
      <Box
        padding={8}
        extend={{ backgroundColor: theme.colors.blue, color: 'white' }}>
        <Layout>
          <Box display="inline" extend={{ lineHeight: 1.5 }}>
            Fela is licensed under the{' '}
            <Box
              as="a"
              href="http://opensource.org/licenses/MIT"
              display="inline"
              extend={{ color: theme.colors.cyan, textDecoration: 'none' }}>
              MIT License
            </Box>
            .<br />
            Documentation is licensed under the{' '}
            <Box
              as="a"
              href="http://creativecommons.org/licenses/by/4.0/"
              display="inline"
              extend={{ color: theme.colors.cyan, textDecoration: 'none' }}>
              Creative Commons License
            </Box>
            .
            <br />
            Written with ❤︎ by{' '}
            <Box
              as="a"
              href="https://weser.io"
              display="inline"
              extend={{ color: theme.colors.cyan, textDecoration: 'none' }}>
              Robin Weser
            </Box>{' '}
            and its{' '}
            <Box
              as="a"
              href="https://github.com/robinweser/fela/graphs/contributors"
              display="inline"
              extend={{ color: theme.colors.cyan, textDecoration: 'none' }}>
              great contributors
            </Box>
            .
          </Box>
        </Layout>
      </Box>
    </Template>
  )
}
