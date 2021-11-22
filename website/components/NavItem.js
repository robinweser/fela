import React from 'react'
import NextLink from 'next/link'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'

export default function NavItem({ href, children }) {
  const { theme } = useFela()

  return (
    <NextLink href={href} passHref>
      <Box
        as="a"
        paddingLeft={2.5}
        paddingRight={2.5}
        height="100%"
        direction="row"
        alignItems="center"
        extend={{
          cursor: 'pointer',
          marginTop: -1,
          fontSize: 16,
          lineHeight: 1,
          textDecoration: 'none',
          color: 'white',
          large: {
            ':first-child': {
              paddingLeft: 0,
            },
            ':last-child': {
              paddingRight: 0,
            },
          },
        }}>
        {children}
      </Box>
    </NextLink>
  )
}
