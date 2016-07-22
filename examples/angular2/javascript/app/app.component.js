import { Component } from '@angular/core';
import { FelaRendererService } from './felaRenderer.service';
import template from './app.component.html';

@Component({
    selector: 'my-app',
    template: template
})
export class AppComponent {

    constructor(felaRendererService: FelaRendererService) {
        this.felaRendererService = felaRendererService;
    }

    initFelaStyles() {
        const rule = props => ({
            fontSize: props.fontSize + 'px',
            color: props.color ? props.color : 'red',
        });

        this.headlineClass = this.felaRendererService.renderRule(rule, { fontSize: 20 });
        this.infoBoxClass = this.felaRendererService.renderRule(rule, { color: '#00ff00' });
    }

    ngOnInit() {
        this.initFelaStyles();
    }

}

