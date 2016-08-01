# Usage with Angular 2
Fela was always designed with React in mind, but is **not** bound to React by default.
To use Fela with Angular 2, you do not need to install any additional bindings, but only the basic Fela package.

### Renderer Service
First of all we need to create a Renderer Service which gets injected into our components.

```javascript
import { Injectable } from '@angular/core'
import { createRenderer, render } from 'fela'

@Injectable()
export class FelaRendererService {
  static renderer = null;

  constructor() {
    if (this.renderer === null) {
      this.renderer = createRenderer()
      render(this.renderer, document.getElementById('stylesheet'))
    }
  }

  renderRule(rule, props) {
    return this.renderer.renderRule(rule, props)
  }
}
```

### Styling Components

Assuming we are using the following template:

```HTML
<h1 class="{{ headerClass }}">Header</h1>
<div class="{{ infoClass }}">I am just an info box.</div>
```

```javascript
import { Component } from '@angular/core'
import { FelaRendererService } from './felaRenderer.service'
import template from './app.component.html'

const rule = props => ({
  fontSize: props.fontSize + 'px',
  color: props.color ? props.color : 'red',
})

@Component({
  selector: 'my-app',
  template: template
})
export class AppComponent {
  constructor(felaRendererService: FelaRendererService) {
    this.felaRendererService = felaRendererService
  }

  renderStyle() {
    this.headerClass = this.felaRendererService.renderRule(rule, { fontSize: 20 })
    this.infoClass = this.felaRendererService.renderRule(rule, { color: '#00ff00' })
  }

  ngOnInit() {
    this.renderStyle()
  }
}
```

## TypeScript
Fela does not only support Angular 2 with pure JavaScript, but also allows the use of TypeScript since version 1.2.

Fela ships TypeScript typings which are automatically referenced so you do not need to worry about those. Using Fela with Angular and TypeScript therefore is basically as simple as it is with plain JavaScript.

> If your buildchain does not find the typings, check the [SystemJS and Typings](#systemjs-and-typings) section below.

### Renderer Service
```typescript
import { Injectable } from '@angular/core'
import { createRenderer, render, Renderer } from 'fela'

@Injectable()
export class FelaRendererService {
  private static renderer:Renderer = null;

  constructor() {
    if (this.renderer === null) {
      this.renderer = createRenderer();
      render(this.renderer, document.getElementById('stylesheet'))
    }
  }

  public renderRule(rule: Function, props?: Object): string {
    return this.renderer.renderRule(rule, props)
  }
}
```

### Styling Components

```typescript
import { Component, OnInit, Type } from '@angular/core'
import { FelaRendererService } from './felaRenderer.service'

const rule = props => ({
  fontSize: props.fontSize + 'px',
  color: props.color ? props.color : 'red',
})

@Component({
  selector: 'sg-app',
  providers: [ FelaRendererService ],
  template: `
    <h1 class="{{ headerClass }}">Header</h1>
    <div class="{{ infoClass }}">I am just an info box.</div>
    `
})
export class AppComponent extends Type implements OnInit {
  headlineClass = '';
  infoBoxClass = '';

  constructor(private felaRendererService: FelaRendererService) {
    super()
  }

  renderStyle() {
    this.headerClass = this.felaRendererService.renderRule(rule, { fontSize: 20 })
    this.infoClass = this.felaRendererService.renderRule(rule, { color: '#00ff00' })
  }

  ngOnInit() {
    this.renderStyle()
  }
}
```

## SystemJS and Typings
Your buildchain might require some additional configuration to correctly use the provided Fela typings.
You need to add two lines:
```typescript
var map = {
  'fela': 'node_modules/fela'
}

var packages = {
  'fela': {
    main: 'dist/fela.js',
    defaultExtension: 'js'
  }
}

var config = { map: map, packages: packages }
System.config(config)
```
