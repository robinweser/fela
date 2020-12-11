import { useFela } from 'react-fela'
import { Box } from 'kilvin'

export function beautifyId(text) {
  return text
    .replace(/ /gi, '-')
    .replace(/(:|[?]|")/gi, '')
    .toLowerCase()
}

export function getId(children, level, fixedId) {
  if (fixedId) {
    return fixedId
  }

  return typeof children === 'string' && level > 1
    ? encodeURI(beautifyId(children))
    : undefined
}

export function getFixedId(children) {
  if (typeof children === 'string' && children.indexOf(';;') !== 0) {
    const [text, fixedId] = children.split(';;')

    if (fixedId && fixedId.length > 0) {
      return [text, fixedId]
    }
  }

  return [children]
}

export default function Heading({ level, children }) {
  const { theme } = useFela()

  const [text, fixedId] = getFixedId(children)
  const id = getId(children, level, fixedId)

  return (
    <Box
      as={'h' + level}
      onClick={() => {
        if (id) {
          window.location.hash = id
        }
      }}
      extend={{
        display: 'block',
        cursor: id ? 'pointer' : 'inherit',
        marginTop: (level === 1 ? 0 : 22) + (level === 2 ? 26 : 0),
        marginBottom: level === 1 ? 30 : 10,
        lineHeight: 1.0,
        fontWeight: level === 1 ? 700 : level === 2 ? 500 : 600,
        scrollMarginTop: 125,
        '> a': {
          color: theme.colors.foreground,
        },
        medium: {
          scrollMarginTop: 65,
        },
      }}
      id={id}>
      {text}
    </Box>
  )
}
