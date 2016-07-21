# Usage with Angular 2 and TypeScript

Fela was always designed with React in mind, but is **not** bound to React by default. 
To use it with Angular 2 and TypeScript you just need to install the normal fela library.

## Example Project

You can checkout the example Project and run it like so:

```sh
git clone https://github.com/rofrischmann/fela.git
cd fela/examples/angular2/typecript
npm install
npm start
```

Check the **prerequisites** from the [Angular 5 min Quickstart Tutorial](https://angular.io/docs/ts/latest/quickstart.html).


## Getting Started

:red_circle: The code examples are based on the SystemJS based build-chain as used in the official [Angular 5 min Quickstart Tutorial](https://angular.io/docs/ts/latest/quickstart.html).
 
### 1. Install Fela Library
 
```sh
npm i --save fela
```


### 2. Create a style element in your index.html

Locate your index.html and place a `<style>` element with an unique id in your code like so.

:file_folde: `index.html`
```html
<html>
<head>
   ...
   <style id="felaStyles"></style>
</head>
...
```

Note that id you used because we will need it in next step.

### 3. Create a Renderer Service

You should create a `FelaRendererService` in your application which can be **Injected into your Components**. 
As you can see it requires a DOMElement with id *felaStyles* to be present. We created that in the previous step in our `index.htm`
 
:file_folder: `felaRenderer.service.ts`

```javascript
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
```


:red_circle: Note that **fela is already shipped with TypeScript typings** which reside in `node_modules/fela/index.d.ts` and are automatically referenced.

### 4. Styling your Componnt with Fela

What is happening here is basically:

  * Import the `FelaRendererService` which we created earlier with `import { FelaRendererService } from './felaRenderer.service';`.
  * Register the service as Provider with `providers: [ FelaRendererService ],`
  * Inject the Service into your Component via the constructror with `constructor(private felaRendererService: FelaRendererService)`
  * Use `this.felaRendererService.renderRule(..)` to render the rule and get the CSS-Classname and use it in your template. 
    * The Service takes care that in the background the generated CSS is added to the DOM.

```typescript
import { Component, OnInit, Type } from '@angular/core';
import { FelaRendererService } from './felaRenderer.service';

@Component({
  selector: 'sg-app',
  providers: [ FelaRendererService ],
  template: `
    <h1 class="{{ headlineClass }}">My First Angular 2 App</h1>
    <div class="{{ infoBoxClass }}">Foo Bar</div>
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
```

