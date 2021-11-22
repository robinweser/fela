import { Box } from 'kilvin'

const style = {
  clip: 'rect(1px, 1px, 1px, 1px)',
  WebkitClipPath: 'inset(50%)',
  clipPath: 'inset(50%)',
  position: 'absolute',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  border: 0,
  padding: 0,
  height: 1,
  width: 1,
}

export default function VisuallyHidden(props) {
  return <Box as="span" extend={style} {...props} />
}
