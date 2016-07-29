import { Injectable } from '@angular/core';
import { createRenderer, render, Renderer } from 'fela';

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
