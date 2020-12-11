import React from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Box, Spacer } from 'kilvin'
import { useFela } from 'react-fela'

import Layout from './Layout'
import Link from './Link'
import NavItem from './NavItem'
import VisuallyHidden from './VisuallyHidden'

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
                <i
                  className="fa fa-twitter"
                  style={{
                    fontSize: 24,
                    position: 'relative',
                    lineHeight: 0.6,
                  }}
                />
                <VisuallyHidden>Twitter</VisuallyHidden>
              </NavItem>

              <NavItem path="https://github.com/robinweser/fela">
                <i
                  className="fa fa-github"
                  style={{
                    fontSize: 24,
                    position: 'relative',
                    lineHeight: 0.6,
                  }}
                />
                <VisuallyHidden>GitHub</VisuallyHidden>
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
