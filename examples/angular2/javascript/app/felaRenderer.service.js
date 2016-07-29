import { Injectable } from '@angular/core';
import { createRenderer, render } from 'fela';

@Injectable()
export class FelaRendererService {
    static renderer = null;

    constructor() {
        if (FelaRendererService.renderer === null) {
            FelaRendererService.renderer = createRenderer();
            render(FelaRendererService.renderer, document.getElementById('felaStyles'));
        }
    }

    renderRule(rule, props) {
        return FelaRendererService.renderer.renderRule(rule, props);
    }

}
