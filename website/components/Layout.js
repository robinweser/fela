import React from 'react'
import { Box } from 'kilvin'

export default function Layout({ children, wide, ...props }) {
  return (
    <Box alignItems="center" grow={1} {...props}>
      <Box
        padding={[5, , , 0]}
        maxWidth={wide ? 1050 : 800}
        width="100%"
        alignSelf="center">
        {children}
      </Box>
    </Box>
  )
}
