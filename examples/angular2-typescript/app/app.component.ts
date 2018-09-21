import { Component, OnInit, Type } from '@angular/core';
import { FelaRendererService } from './felaRenderer.service';
import { DummyComponent } from './dummy.component';

@Component({
  selector: 'sg-app',
  providers: [ FelaRendererService ],
  directives: [ DummyComponent ],
  template: `
    <h1 class="{{ headlineClass }}">My First Angular 2 App</h1>
    <div class="{{ infoBoxClass }}">Foo Bar</div>
    <sg-dummy></sg-dummy>
    `
})
export class AppComponent extends Type implements OnInit {
  headlineClass = '';
  infoBoxClass = '';

  constructor(private felaRendererService: FelaRendererService) {
    super();
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
