import React from 'react'
import Wrapper from './components/Wrapper'
import Text from './components/Text'
import Header from './components/Header'
import Input from './containers/Input'

export default () => (
  <Wrapper>
    <Header title="Welcome to Fela." />
    <Text>This is the basic example with React.</Text>
    <Input />
  </Wrapper>
)
