import React, { useState, useEffect } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'
import copyToClipboard from 'copy-to-clipboard'

import nightOwl from 'prism-react-renderer/themes/github'

// const colors = {
//   keyword: '#07a',
//   number: '#905',
//   constant: '#905',
//   property: '#905',
//   punctuation: '#999',
//   function: '#dd4a68',
//   string: '#690',
//   comment: '#708090',
//   operator: '#9a6e3a',
// }

// const getTokenColor = (token) => {
//   for (let key in colors) {
//     if (token.indexOf(key) !== -1) {
//       return colors[key]
//     }
//   }
// }

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
    <Box>
      {!nocopy && (
        <Box
          alignSelf="flex-end"
          alignItems="center"
          space={2}
          extend={{
            position: 'absolute',
            marginTop: name ? 0 : -20,
            paddingRight: 10,
          }}>
          <Box
            extend={{
              position: 'absolute',
              marginTop: name ? -16 : -12,
              color: theme.colors.blueDark,
              marginLeft: 0,
              fontSize: 12,
            }}>
            {copied ? 'Copied!' : ''}
          </Box>
          <Box
            as="button"
            width={34}
            height={34}
            alignItems="center"
            justifyContent="center"
            padding={1.7}
            onClick={() => {
              setCopied(true)
              copyToClipboard(children)
            }}
            extend={{
              cursor: 'pointer',
              borderRadius: 20,
              outline: 0,
              backgroundColor: theme.colors.blue,
              borderWidth: 2,
              borderStyle: 'solid',
              borderColor: theme.colors.blueDark,
              color: 'white',
              fontSize: 15,

              transition:
                'background-color 200ms ease-out, color 200ms ease-in-out, border-color 200ms ease-in-out, transform 100ms ease-out',
              ':hover': {
                backgroundColor: theme.colors.blueDark,
              },
              ':active': {
                transform: 'scale(0.95, 0.95)',
              },
            }}>
            <i class="far fa-copy"></i>
          </Box>
        </Box>
      )}
      {name && (
        <Box
          as="p"
          direction="row"
          space={2}
          paddingTop={2}
          paddingBottom={2}
          paddingRight={2}
          paddingLeft={2}
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
            paddingTop={[!nocopy ? 7 : 3.5, , , 3.5]}
            paddingBottom={3.5}
            paddingRight={4}
            paddingLeft={4}
            marginBottom={1.5}
            maxWidth="100%"
            extend={{
              backgroundColor: theme.colors.background,
              overflow: 'auto',
            }}>
            <Box
              as="code"
              extend={{
                fontSize: 15,
                fontFamily:
                  'Dank, Dank Mono, Fira Code, Hack, Consolas, monospace',
                textRendering: 'optimizeLegibility',
              }}>
              {tokens.map((line, i) => (
                <div key={i}>
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
                </div>
              ))}
            </Box>
          </Box>
        )}
      </Highlight>
    </Box>
  )
}
