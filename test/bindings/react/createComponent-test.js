import createComponent from '../../../modules/bindings/react/createComponent'
import createRenderer from '../../../modules/createRenderer'
import { createElement } from 'react'

describe('Creating Components from Fela rules', () => {
  it('should return a Component', () => {
    const rule = props => ({
      color: props.color,
      fontSize: 16
    })
    const component = createComponent(rule)

    expect(component).to.be.a.function
  })

  it('should render fela rules depending on the passed props', () => {
    const rule = props => ({
      color: props.color,
      fontSize: 16
    })
    const component = createComponent(rule)

    const renderer = createRenderer()

    const element = component({ color: 'black' }, { renderer })

    expect(element.type).to.eql('div')

    expect(element.props.className).to.eql('a b')
    expect(renderer.rules).to.eql('.a{color:black}.b{font-size:16}')
  })

  it('should use the theme for static rendering by default', () => {
    const rule = props => ({
      color: props.theme.color,
      fontSize: 16
    })
    const component = createComponent(rule)
    const renderer = createRenderer()

    const element = component({}, {
      renderer,
      theme: { color: 'red' }
    })

    expect(element.type).to.eql('div')

    expect(element.props.className).to.eql('a b')
    expect(renderer.rules).to.eql('.a{color:red}.b{font-size:16}')
  })

  it('should only pass explicit props to the element', () => {
    const rule = props => ({
      color: props.color,
      fontSize: 16
    })
    const component = createComponent(rule, 'div', ['onClick'])

    const renderer = createRenderer()

    const element = component(
      {
        onClick: false,
        onHover: true
      },
      { renderer }
    )

    expect(element.props.onClick).to.eql(false)
    expect(element.props.onHover).to.eql(undefined)
  })

  it('should pass all props to the element', () => {
    const rule = props => ({
      color: props.color,
      fontSize: 16
    })
    const component = createComponent(rule, 'div', props => props)

    const renderer = createRenderer()

    const element = component(
      {
        onClick: false,
        onHover: true
      },
      { renderer }
    )

    expect(element.props.onClick).to.eql(false)
    expect(element.props.onHover).to.not.eql(undefined)
  })

  it('should only use passed props to render Fela rules', () => {
    const rule = props => ({
      color: props.foo && props.color,
      fontSize: '16px'
    })
    const component = createComponent(rule, 'div', ['foo'])

    const renderer = createRenderer()

    const element = component(
      {
        foo: true,
        color: 'black'
      },
      { renderer }
    )

    expect(element.props.foo).to.eql(true)
    expect(renderer.rules).to.eql('.a{color:black}.b{font-size:16px}')
  })

  it('should compose styles', () => {
    const rule = props => ({
      color: 'blue',
      fontSize: '16px'
    })

    const anotherRule = props => ({
      color: 'red',
      lineHeight: 1.2
    })

    const Comp = createComponent(rule)
    const ComposedComp = createComponent(anotherRule, Comp)

    const renderer = createRenderer()

    const element = ComposedComp({}, { renderer })
    const renderedElement = element.type(element.props, { renderer })

    expect(renderer.rules).to.eql('.a{color:red}.b{font-size:16px}.c{line-height:1.2}')
    expect(renderedElement.props.className).to.eql('a b c')
  })

  it('should compose passThrough props', () => {
    const component = createComponent(() => ({}), 'div', props => props)
    const composedComponent = createComponent(() => ({}), component, ['onClick'])

    const renderer = createRenderer()

    const onClick = () => true
    const element = composedComponent({ color: 'red' }, { renderer })
    const renderedElement = element.type(
      {
        ...element.props,
        onClick
      },
      { renderer }
    )

    expect(renderedElement.props.color).to.eql('red')
    expect(renderedElement.props.onClick).to.eql(onClick)
  })

  it('should only use the rule name as displayName', () => {
    const Button = props => ({
      color: 'red',
      fontSize: 16
    })
    const component = createComponent(Button)

    expect(component.displayName).to.eql('Button')
  })

  it('should only use the rule name as displayName', () => {
    const Button = props => ({
      color: 'red',
      fontSize: 16
    })
    const component = createComponent(Button)
    const renderer = createRenderer()
    const buttonInstance = component({ is: 'button' }, { renderer })

    expect(buttonInstance.type).to.eql('button')
  })
})
