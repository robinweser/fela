/* @flow */
import { render, rehydrate } from 'fela-dom'
import objectEach from 'fast-loops/lib/objectEach'

function hasDOM(renderer) {
  return (
    renderer &&
    !renderer.isNativeRenderer &&
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )
}

function hasServerRenderedStyle() {
  return window.document.querySelectorAll('[data-fela-type]').length > 0
}

export default function RendererProviderFactory(
  BaseComponent: any,
  RendererContext: any,
  createElement: Function,
  renderChildren: Function,
  statics?: Object
): any {
  class RendererProvider extends BaseComponent {
    constructor(props: Object, context: Object) {
      super(props, context)

      if (hasDOM(props.renderer)) {
        if (props.target) {
          this.subscription = props.renderer.subscribeDocument(props.target)
        }

        if (props.rehydrate && hasServerRenderedStyle()) {
          rehydrate(props.renderer)
        } else {
          render(props.renderer)
        }
      }
    }

    componentWillUnmount() {
      if (hasDOM(this.props.renderer) && this.subscription) {
        this.subscription.unsubscribe()
      }
    }

    render(): Object {
      return createElement(
        RendererContext.Provider,
        {
          value: this.props.renderer,
        },
        renderChildren(this.props.children)
      )
    }
  }

  if (statics) {
    objectEach(statics, (value, key) => {
      RendererProvider[key] = value
    })
  }

  return RendererProvider
}
