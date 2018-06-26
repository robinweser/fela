/* @flow */
import { render, rehydrate } from 'fela-dom'
import objectEach from 'fast-loops/lib/objectEach'

function hasDOM(renderer) {
  return (
    !renderer.isNativeRenderer &&
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )
}

function hasServerRenderedStyle() {
  return window.document.querySelectorAll('[data-fela-type]').length > 0
}

export default function ProviderFactory(
  BaseComponent: any,
  renderChildren: Function,
  statics?: Object
): any {
  class Provider extends BaseComponent {
    constructor(props: Object, context: Object) {
      super(props, context)

      if (hasDOM(props.renderer) && props.renderToDOM) {
        render(props.renderer)
      }
    }

    componentDidMount() {
      if (
        !this.props.renderer.devMode &&
        hasDOM(this.props.renderer) &&
        hasServerRenderedStyle()
      ) {
        // CLEAR NODES
        console.log('HAS REHYDRATED STYLES')
      }
    }

    getChildContext(): Object {
      return {
        renderer: this.props.renderer,
      }
    }

    render(): Object {
      return renderChildren(this.props.children)
    }
  }

  if (statics) {
    objectEach(statics, (value, key) => {
      Provider[key] = value
    })
  }

  return Provider
}
