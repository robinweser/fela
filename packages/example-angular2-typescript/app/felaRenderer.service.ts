import { Injectable } from '@angular/core';
import { createRenderer, Renderer } from 'fela';
import { render } from 'fela-dom';

@Injectable()
export class FelaRendererService {
  private static renderer:Renderer = null;

  constructor() {
    if (FelaRendererService.renderer === null) {
      FelaRendererService.renderer = createRenderer();
      render(FelaRendererService.renderer, document.getElementById('felaStyles'));
    }
  }

  public renderRule(rule: Function, props?: Object): string {
    return FelaRendererService.renderer.renderRule(rule, props);
  }

}
