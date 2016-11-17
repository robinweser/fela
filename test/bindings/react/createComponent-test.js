import createComponent from '../../../modules/bindings/react/createComponent'
import createRenderer from '../../../modules/createRenderer'

describe('Creating Components from Fela rules', () => {
  it('should return a Component', () => {
    const rule = props => ({ color: props.color, fontSize: 16 })
    const component = createComponent(rule)

    expect(component).to.be.a.function
  })

  it('should render fela rules depending on the passed props', () => {
    const rule = props => ({ color: props.color, fontSize: 16 })
    const component = createComponent(rule)

    const renderer = createRenderer()

    const element = component({ color: 'black' }, { renderer })

    expect(element.type).to.eql('div')
    expect(element.props.className).to.eql('c0 c0-ldchvg')
    expect(renderer.rules).to.eql('.c0{font-size:16}.c0-ldchvg{color:black}')
  })

  it('should only pass explicit props to the element', () => {
    const rule = props => ({ color: props.color, fontSize: 16 })
    const component = createComponent(rule, 'div', { onClick: false })

    const renderer = createRenderer()

    const element = component({ onClick: false, onHover: true }, {
      renderer
    })

    expect(element.props.onClick).to.eql(false)
    expect(element.props.onHover).to.eql(undefined)
  })

  it('should only use passed props to render Fela rules', () => {
    const rule = props => ({
      color: props.foo && props.color || 'red',
      fontSize: 16
    })
    const component = createComponent(rule, 'div', { foo: true })

    const renderer = createRenderer()

    const element = component({ foo: true, color: 'black' }, {
      renderer
    })

    expect(element.props.foo).to.eql(true)
    expect(renderer.rules).to.eql('.c0{color:red;font-size:16}.c0--1u3zxk{color:black}')
  })

  it('should only use the rule name as displayName', () => {
    const Button = props => ({ color: 'red', fontSize: 16 })
    const component = createComponent(Button)

    expect(component.displayName).to.eql('Button')
  })
})
