import React from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Box, Spacer } from 'kilvin'
import { useFela } from 'react-fela'
import { DocSearch } from '@docsearch/react'
import '@docsearch/css'

import Layout from './Layout'
import Link from './Link'
import NavItem from './NavItem'
import Icon from './Icon'
import Twitter from '../icons/Twitter'
import GitHub from '../icons/GitHub'

export default function Template({ children }) {
  const { theme } = useFela()
  const router = useRouter()

  const isDocs = router.pathname.indexOf('/docs') !== -1

  return (
    <Box grow={1} maxWidth="100vw">
      <Box
        as="header"
        direction="row"
        height={70}
        alignItems="center"
        role="banner"
        extend={{
          backgroundColor: theme.colors.blue,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2,
        }}>
        <Layout>
          <Box direction="row" justifyContent="space-between" space={5}>
            <Box direction="row" alignItems="center">
              <NavItem href="/">Home</NavItem>
              <NavItem href="/docs">Docs</NavItem>
            </Box>
            {isDocs && (
              <Box grow={1}>
                <Box grow={1} maxWidth={600}>
                  <DocSearch
                    appId="BH4D9OD16A"
                    indexName="fela-js"
                    apiKey="8162c7234f303213ba1b2207825d3b17"
                  />
                </Box>
              </Box>
            )}
            <Box direction="row" alignItems="center">
              <NavItem href="https://github.com/robinweser/fela">
                <Box display={['none', , 'flex']}>Source</Box>
                <Icon
                  icon={GitHub}
                  extend={{
                    fontSize: 28,
                    marginLeft: 0,
                    medium: {
                      marginLeft: 8,
                    },
                  }}
                  label="GitHub"
                />
              </NavItem>
              <NavItem href="https://twitter.com/felajs">
                <Icon
                  icon={Twitter}
                  extend={{ fontSize: 24 }}
                  label="Twitter"
                />
              </NavItem>
            </Box>
          </Box>
        </Layout>
      </Box>
      <Box grow={1} paddingTop={70 / theme.baselineGrid}>
        {children}
      </Box>
    </Box>
  )
}
