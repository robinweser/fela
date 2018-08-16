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
  renderChildren: Function,
  statics?: Object
): any {
  class RendererProvider extends BaseComponent {
    constructor(props: Object, context: Object) {
      super(props, context)

      if (props.rehydrate && hasDOM(props.renderer)) {
        if (hasServerRenderedStyle()) {
          rehydrate(props.renderer)
        } else {
          render(props.renderer)
        }
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
      RendererProvider[key] = value
    })
  }

  return RendererProvider
}
