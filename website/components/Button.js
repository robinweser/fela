import React from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'

export default function Button({
  children,
  href,
  variant = 'primary',
  onClick,
}) {
  const { theme } = useFela()

  return (
    <div style={{ width: '100%' }}>
      <Box
        as={href ? 'a' : 'button'}
        onClick={onClick}
        href={href}
        extend={{
          display: 'inline-flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          appearance: 'none',
          textDecoration: 'none',
          padding: '8px 12px',
          borderRadius: 4,

          fontSize: 18,
          fontFamily: 'inherit',

          borderWidth: 2,
          borderStyle: 'solid',
          transition: 'all 130ms ease-in-out',

          extend: [
            {
              condition: variant === 'primary',
              style: {
                color: 'white',
                backgroundColor: theme.colors.blue,
                borderColor: theme.colors.blue,
                ':hover': {
                  backgroundColor: theme.colors.blueDark,
                  borderColor: theme.colors.blueDark,
                },
              },
            },
            {
              condition: variant === 'secondary',
              style: {
                color: theme.colors.blueLight,
                borderColor: theme.colors.blueLight,
                backgroundColor: 'transparent',
                ':hover': {
                  backgroundColor: theme.colors.blue,
                  borderColor: theme.colors.blue,
                  color: 'white',
                },
              },
            },
          ],
        }}>
        {children}
      </Box>
    </div>
  )
}
