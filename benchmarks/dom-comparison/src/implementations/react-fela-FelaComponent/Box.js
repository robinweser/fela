import React from 'react'
import { FelaComponent } from 'react-fela'

const rule = ({ color, fixed = false, layout = 'column', outer = false }) => ({
  alignItems: 'stretch',
  borderWidth: '0px',
  borderStyle: 'solid',
  boxSizing: 'border-box',
  display: 'flex',
  flexBasis: 'auto',
  flexDirection: 'column',
  flexShrink: '0',
  margin: '0px',
  padding: '0px',
  position: 'relative',
  // fix flexbox bugs
  minHeight: '0px',
  minWidth: '0px',
  ...styles[`color${color}`],
  ...(fixed && styles.fixed),
  ...(layout === 'row' && styles.row),
  ...(outer && styles.outer),
})

const Box = ({ children, color, fixed, layout, outer }) => (
  <FelaComponent
    rule={rule}
    color={color}
    fixed={fixed}
    layout={layout}
    outer={outer}>
    {children}
  </FelaComponent>
)

const styles = {
  outer: {
    alignSelf: 'flex-start',
    padding: '4px',
  },
  row: {
    flexDirection: 'row',
  },
  color0: {
    backgroundColor: '#14171A',
  },
  color1: {
    backgroundColor: '#AAB8C2',
  },
  color2: {
    backgroundColor: '#E6ECF0',
  },
  color3: {
    backgroundColor: '#FFAD1F',
  },
  color4: {
    backgroundColor: '#F45D22',
  },
  color5: {
    backgroundColor: '#E0245E',
  },
  fixed: {
    width: '6px',
    height: '6px',
  },
}

export default Box
