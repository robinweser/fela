import React from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Box, Spacer } from 'kilvin'
import { useFela } from 'react-fela'

import Layout from './Layout'
import Link from './Link'
import NavItem from './NavItem'
import Icon from './Icon'
import Twitter from '../icons/Twitter'
import GitHub from '../icons/GitHub'

export default function Template({ children }) {
  const { theme } = useFela()
  const router = useRouter()

  return (
    <Box grow={1}>
      <Box
        as="header"
        direction="row"
        height={[50, , 44]}
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
          <Box direction="row" justifyContent="space-between">
            <Box direction="row">
              <NavItem path="/">Home</NavItem>
              <NavItem path="/docs">Docs</NavItem>
            </Box>
            <Box direction="row">
              <NavItem path="https://twitter.com/felajs">
                <Icon
                  icon={Twitter}
                  extend={{ fontSize: 24 }}
                  label="Twitter"
                />
              </NavItem>

              <NavItem path="https://github.com/robinweser/fela">
                <Icon icon={GitHub} extend={{ fontSize: 24 }} label="GitHub" />
              </NavItem>
            </Box>
          </Box>
        </Layout>
      </Box>
      <Box grow={1} paddingTop={[12.5, , 11]}>
        {children}
      </Box>
    </Box>
  )
}
