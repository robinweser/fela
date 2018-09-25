import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createRenderer } from 'fela'
import { mount } from 'enzyme'
import ProviderFactory from '../ProviderFactory'

const mockCallback = jest.fn()

jest.mock('fela-dom', () => ({
  render: () => mockCallback('render'),
  rehydrate: () => mockCallback('rehydrate'),
}))

afterAll(() => {
  jest.unmock('fela-dom')
})

describe('ProviderFactory', () => {
  beforeEach(() => {
    mockCallback.mockClear()
  })

  it('should do the initial render before childrens componentDidMount hook', () => {
    const didMount = () => mockCallback('didMount')
    const renderChildren = children => children
    const renderer = createRenderer()
    const Provider = ProviderFactory(Component, renderChildren, {
      childContextTypes: { renderer: PropTypes.object },
    })

    class Child extends Component {
      componentDidMount() {
        didMount()
      }
      render() {
        return <div />
      }
    }

    mount(
      <Provider rehydrate renderToDOM renderer={renderer}>
        <Child />
      </Provider>
    )
    expect(mockCallback.mock.calls.length).toBe(2)
    expect(mockCallback.mock.calls[0][0]).toBe('render')
    expect(mockCallback.mock.calls[1][0]).toBe('didMount')
  })
})
