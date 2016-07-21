# Usage with Angular 2 and TypeScript

Fela was always designed with React in mind, but is **not** bound to React by default. 
To use it with Angular 2 and TypeScript you just need to install the normal fela library.

## Example Project

You can checkout the **Angular 2 example project** and run it like so:

```sh
git clone https://github.com/rofrischmann/fela.git
cd fela/examples/angular2/typescript
npm install
npm run start
```

Check out the **prerequisites** from the [Angular 5 min Quickstart Tutorial](https://angular.io/docs/ts/latest/quickstart.html).


## Configure Fela in your Angular 2 Project

:red_circle: The code examples are based on the SystemJS based build-chain as used in the official [Angular 5 min Quickstart Tutorial](https://angular.io/docs/ts/latest/quickstart.html).
 
### 1. Install Fela Library
 
```sh
npm i --save fela
```


### 2. Create a style element in your index.html

Locate your index.html and place a `<style>` element with an unique id in your code like so.

:file_folder: `index.html`
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
As you can see it requires a DOMElement with id *felaStyles* to be present. We created that in the previous step in our `index.html`
 
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


:red_circle: Note that **fela is already shipped with TypeScript typings** which reside in `node_modules/fela/index.d.ts` and are automatically referenced. Depending on your buildchain you might need to configure some additional things. See step 5.

### 4. Styling your Component with Fela

What is happening here is basically:

  * Import the `FelaRendererService` which we created earlier with 
    * `import { FelaRendererService } from './felaRenderer.service';`.
  * Register the service as Provider with 
    * `providers: [ FelaRendererService ],`
  * Inject the Service into your Component via the constructror with 
    * `constructor(private felaRendererService: FelaRendererService)`
  * Render rules and get the CSS-Classname and use it in your template with
    * `className = this.felaRendererService.renderRule(..)`
    * The Service takes care that in the background the generated CSS is added to the DOM.

:file_folder: `app.component.ts`

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

### 5. Optional: Configure SystemJS and Typings

If you are using the buildchain from the official [Angular 5 min Quickstart Tutorial](https://angular.io/docs/ts/latest/quickstart.html)
you might need to **adjust your buildchain so that the Fela typings can be found**.

You need to add two lines:

  * map-Array:
    * `'fela': 'node_modules/fela'`
  * packages-Arry:
    * `'fela': { main: 'dist/fela.js', defaultExtension: 'js' },`
    
:file_folder: `systemjs.config.js`

```typescript
...
    var map = {
        'app':            'app', // 'dist',
...
        'rxjs':           'node_modules/rxjs',
        'fela':           'node_modules/fela'
    };
    var packages = {
        'app':            { main: 'main.js',  defaultExtension: 'js' },
        'rxjs':           { defaultExtension: 'js' },
        'fela':           { main: 'dist/fela.js', defaultExtension: 'js' },
    };
...
    var config = { map: map, packages: packages };
    System.config(config);
...
```


