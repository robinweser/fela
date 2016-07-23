# Usage with Angular 2 and JavaScript

Fela was always designed with React in mind, but is **not** bound to React by default. 
To use it with Angular 2 and JavaScript you just need to install the normal Fela library.

## Example Project

You can checkout the **Angular 2 example project** and run it like so:

```sh
git clone https://github.com/rofrischmann/fela.git
cd fela/examples/angular2/javascript
npm install
npm run start
```

The **Code Level of the example is ECMAScript 6**.


## Configure Fela in your Angular 2 Project

:red_circle: The code examples are based on the build-chain as used in [Angular 2 ESNext TodoMVC](https://github.com/blacksonic/angular2-esnext-todomvc).
 
### 1. Install Fela Library
 
```sh
npm i --save fela

```

### 2. Create a style element in your index.html

Locate your index.html and place a `<style>` element with an unique id in your code like so.
Depending on your buildchain either add fela dependnecy here or somewhere else.

:file_folder: [`index.html`](https://github.com/rofrischmann/fela/blob/master/examples/angular2/javascript/index.html)
```html
<html>
<head>
   ...
   <script src="../node_modules/fela/dist/fela.js"></script>
   <style id="felaStyles"></style>
</head>
...
```

Note that id you used because we will need it in next step.

### 3. Create a Renderer Service

You should create a `FelaRendererService` in your application which can be **Injected into your Components**. 
As you can see it requires a DOMElement with id *felaStyles* to be present. We created that in the previous step in our `index.html`
 
:file_folder: [`app/felaRenderer.service.js`](https://github.com/rofrischmann/fela/blob/master/examples/angular2/javascript/app/felaRenderer.service.js)

```javascript
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
```


### 4. Styling your Component with Fela

What is happening here is basically:

  * Import the `FelaRendererService` which we created earlier with 
    * `import { FelaRendererService } from './felaRenderer.service';`.
  * Inject the Service into your Component via the constructror with 
    * `constructor(private felaRendererService: FelaRendererService)`
  * Render rules and get the CSS-Classname and use it in your template with
    * `className = this.felaRendererService.renderRule(..)`
    * The Service takes care that in the background the generated CSS is added to the DOM.

:file_folder: [`app/app.component.js`](https://github.com/rofrischmann/fela/blob/master/examples/angular2/javascript/app/app.component.js)

```javascript
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
```

:file_folder: [`app/app.component.html`](https://github.com/rofrischmann/fela/blob/master/examples/angular2/javascript/app/app.component.html)
```html
<h1 class="{{ headlineClass }}">My First Angular 2 App</h1>
<div class="{{ infoBoxClass }}">Foo Bar</div>
```


### X. Appendix
 
We extended the build chain by the following. You do not need to do anything, we just wanted to mention,
 that we needed to configure **babel-plugin-transform-class-properties** to make fela work with ES6 Angular 2.

```sh
npm i --save-dev babel-plugin-transform-class-properties
```

:file_folder: [`.babelrc`](https://github.com/rofrischmann/fela/blob/master/examples/angular2/javascript/.babelrc)

```
{
 "presets": ["es2015", "angular2"],
  "plugins": ["transform-class-properties"]
}
```

