import React from 'react'
import { createComponent } from 'react-fela'

const __block = ({ size, isEnabled }) => ({
  width: `${size}`,
  height: `${size}`,
  position: 'relative',
  backgroundColor: '#eee',
  '> input': {
    width: '100%',
    height: '100%',
    position: 'absolute',
    margin: '0',
    top: '50%',
    left: '0',
    transform: 'translateY(-50%)',
    opacity: '0',
    cursor: `${isEnabled ? 'pointer' : 'default'}`
  }
})

const __absoluteElement = () => ({
  position: 'absolute'
})

const Block = createComponent(__block)

const AbsElem = createComponent(__absoluteElement)

const AComponentBlock = () =>
  <div>
    <Block size={200}>
      <input type="checkbox" value="false" isEnabled="false" />
    </Block>
    <Block size={100}>
      <AbsElem />
    </Block>
  </div>

export default function AComponent(props) {
  const { children, ...passDownProps } = props
  return (
    <AComponentBlock {...passDownProps}>
      {children}
    </AComponentBlock>
  )
}
