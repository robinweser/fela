import { Component, OnInit, Type } from '@angular/core';
import { FelaRendererService } from './felaRenderer.service';

@Component({
  selector: 'sg-dummy',
  providers: [ FelaRendererService ],
  template: `
    <div class="{{ dummyClass }}">this is just some styled dummy text</div>
    `
})
export class DummyComponent extends Type implements OnInit {
  dummyClass = '';

  constructor(private felaRendererService: FelaRendererService) {
    super();
  }

  initFelaStyles() {
    const rule = props => ({
      color: props.color ? props.color : 'red',
    });

    this.dummyClass = this.felaRendererService.renderRule(rule, { color: '#0000ff' });
  }

  ngOnInit() {
    this.initFelaStyles();
  }
}
