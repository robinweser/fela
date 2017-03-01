import { Injectable } from '@angular/core'
import { createRenderer } from 'fela'
import { render } from 'fela-dom'

@Injectable()
export class FelaRendererService {
  static renderer = null;

  constructor() {
    if (FelaRendererService.renderer === null) {
      FelaRendererService.renderer = createRenderer()
      render(FelaRendererService.renderer, document.getElementById('felaStyles'))
    }
  }

  renderRule(rule, props) {
    return FelaRendererService.renderer.renderRule(rule, props)
  }
}
