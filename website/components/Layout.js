import React from 'react'
import { Box } from 'kilvin'

export default function Layout({ children, ...props }) {
  return (
    <Box alignItems="center" grow={1} {...props}>
      <Box
        padding={[5, , , , 0]}
        maxWidth={1280}
        width="100%"
        alignSelf="center">
        {children}
      </Box>
    </Box>
  )
}
