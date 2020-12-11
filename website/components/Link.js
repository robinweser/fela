import React from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'
import VisuallyHidden from './VisuallyHidden'

export default function Link({ href, children, extern, extend }) {
  const { theme } = useFela()

  return (
    <Box
      as="a"
      target={extern ? '_blank' : undefined}
      rel={extern ? 'noreferrer noopener' : undefined}
      href={href}
      extend={{
        display: 'inline',
        alignSelf: 'flex-start',
        textDecoration: 'none',
        color: theme.colors.blueText,
        ':hover': {
          color: theme.colors.blueDark,
        },
        extend,
      }}>
      {children}
      {extern && (
        <span title="Opens a new tab">
          <Box
            as="svg"
            aria-hidden="true"
            focusable="false"
            xmlns="https://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            extend={{
              verticalAlign: '-2px',
              color: 'inherit',
              width: 16,
              height: 16,
              stroke: 'currentcolor',
              strokeWidth: '2px',
              display: 'inline-block',
            }}>
            <path d="M22 11L10.5 22.5M10.44 11H22v11.56" fill="none"></path>
          </Box>
          <VisuallyHidden>(new tab)</VisuallyHidden>
        </span>
      )}
    </Box>
  )
}
