import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createRenderer } from 'fela'
import { mount } from 'enzyme'
import RendererProviderFactory from '../RendererProviderFactory'

const mockCallback = jest.fn()

jest.mock('fela-dom', () => ({
  render: () => mockCallback('render'),
  rehydrate: () => mockCallback('rehydrate'),
}))

afterAll(() => {
  jest.unmock('fela-dom')
})

describe('RendererProviderFactory', () => {
  beforeEach(() => {
    mockCallback.mockClear()
  })

  it('should do the initial render before childrens componentDidMount hook', () => {
    const didMount = () => mockCallback('didMount')
    const renderChildren = children => children
    const renderer = createRenderer()
    const RendererProvider = RendererProviderFactory(
      Component,
      renderChildren,
      {
        childContextTypes: { renderer: PropTypes.object },
      }
    )

    class Child extends Component {
      componentDidMount() {
        didMount()
      }
      render() {
        return <div />
      }
    }

    mount(
      <RendererProvider rehydrate renderer={renderer}>
        <Child />
      </RendererProvider>
    )
    expect(mockCallback.mock.calls.length).toBe(2)
    expect(mockCallback.mock.calls[0][0]).toBe('render')
    expect(mockCallback.mock.calls[1][0]).toBe('didMount')
  })
})
