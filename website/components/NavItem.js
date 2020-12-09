import React from 'react'
import NextLink from 'next/link'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'

export default function NavItem({ path, children }) {
  const { theme } = useFela()

  return (
    <NextLink href={path} passHref>
      <Box
        as="a"
        paddingLeft={1.5}
        paddingRight={1.5}
        height="100%"
        extend={{
          cursor: 'pointer',
          marginTop: -1,
          fontSize: 16,
          lineHeight: 1,
          textDecoration: 'none',
          color: 'white',
          ':first-child': {
            paddingLeft: 0,
          },
          ':last-child': {
            paddingRight: 0,
          },
        }}>
        {children}
      </Box>
    </NextLink>
  )
}
