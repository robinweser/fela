import React, { useState, useEffect } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'
import copyToClipboard from 'copy-to-clipboard'

import nightOwl from 'prism-react-renderer/themes/github'
import VisuallyHidden from './VisuallyHidden'
import Icon from './Icon'
import Copy from '../icons/Copy'
import Check from '../icons/Check'

export default function CodeBlock({
  children,
  className = '',
  nocopy = false,
  name,
  info,
}) {
  const { theme } = useFela()
  const [copied, setCopied] = useState(false)
  const language = className.replace(/language-/, '')

  // Remove newline from end of code
  const code = children.replace(/\n$/g, '')

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 2000)
    }
  }, [copied])

  return (
    <Box shrink={1} maxWidth="100%" marginTop={3}>
      {!nocopy && (
        <Box
          alignSelf="flex-end"
          alignItems="center"
          paddingRight={4}
          space={2}
          extend={{
            position: 'absolute',
            marginTop: name ? 12 : -14,
          }}>
          <Box
            as="button"
            width={48}
            height={48}
            alignItems="center"
            justifyContent="center"
            padding={1.7}
            onClick={() => {
              setCopied(true)
              copyToClipboard(children)
            }}
            extend={{
              cursor: 'pointer',
              borderRadius: '50%',
              outline: 0,
              backgroundColor: theme.colors.blueLight,
              color: 'white',
              border: 'none',
              fontSize: 18,

              transition:
                'background-color 200ms ease-out, color 200ms ease-in-out, border-color 200ms ease-in-out, transform 100ms ease-out',
              ':hover': {
                backgroundColor: theme.colors.blue,
                opacity: 1,
              },
              ':focus': {
                backgroundColor: theme.colors.blue,
                opacity: 1,
                boxShadow: `0 0 0 2px white, 0 0 0 4px ${theme.colors.pink}`,
              },
              ':active': {
                transform: 'scale(0.95, 0.95)',
              },
            }}
            type="button">
            <Icon icon={copied ? Check : Copy} label="Copy code" />
          </Box>
        </Box>
      )}
      {name && (
        <Box
          as="p"
          direction="row"
          space={2}
          padding={3}
          extend={{
            fontSize: 14,
            lineHeight: 1,
            fontWeight: 700,
            backgroundColor: 'rgb(220, 220, 220)',
          }}>
          {name}
          <i style={{ color: 'rgb(100, 100, 100)', fontWeight: 400 }}>
            {info ? ' (' + info + ')' : ''}
          </i>
        </Box>
      )}
      <Highlight
        {...defaultProps}
        theme={nightOwl}
        code={code}
        language={language}>
        {({ tokens, getTokenProps }) => (
          <Box
            as="pre"
            paddingTop={[!nocopy ? 7 : 4.5, , , 4.5]}
            paddingBottom={4.5}
            paddingRight={5}
            paddingLeft={5}
            marginBottom={1.5}
            extend={{
              lineHeight: 1.4,
              backgroundColor: theme.colors.background,
            }}>
            <Box
              as="code"
              extend={{
                fontSize: 16,
                overflow: 'auto',
                fontFamily:
                  'dm, Dank, Dank Mono, Fira Code, Hack, Consolas, monospace',
                textRendering: 'optimizeLegibility',
              }}>
              {tokens.map((line, i) => (
                <Box key={i} direction="row" wrap="wrap">
                  {line.map((token, key) => {
                    const props = getTokenProps({ token, key })

                    if (key === 0 && !props.children && line.length !== 1) {
                      return null
                    }

                    return (
                      <Box
                        as="span"
                        extend={{
                          display: 'inline',
                          backgroundColor: 'transparent !important',
                        }}
                        key={key}
                        data-key={key}
                        {...props}>
                        {/* {props.children || ' '} */}
                      </Box>
                    )
                  })}
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Highlight>
    </Box>
  )
}
