# Usage with Angular 2 and Dart

Fela was always designed with React in mind, but is **not** bound to React by default. 
To use it with Angular 2 and Dart you just need to install the normal Fela library.

:bangbang: **CURRENTLY NOT WORKING DUE TO PROBLEMS WITH JS INTEROPERABILITY** :bangbang:

## Example Project

You can checkout the **Angular 2 example project** and run it like so:

```sh
git clone https://github.com/rofrischmann/fela.git
cd fela/examples/angular2/dart
pub get
pub serve
```

Check out the **prerequisites** from the [Angular 5 min Quickstart Tutorial](https://angular.io/docs/ts/latest/quickstart.html).
Basically have [Dart, Dartium and Content Shell installed](https://www.dartlang.org/install).
Add don't forget to [add `pub` to `PATH`](https://www.dartlang.org/tools/pub/installing).


## Configure Fela in your Angular 2 Project

:red_circle: The code examples are based on the Dart build-chain as used in the official [Angular 5 min Quickstart Tutorial](https://angular.io/docs/ts/latest/quickstart.html).
 
### 1. Configure JS interoperability Dependency

Add the [js interoperability dependency](https://pub.dartlang.org/packages/js) to your `pubspec.yml`.

:file_folder: `pubspec.yml`
```yml
dependencies:
  js: ^0.6.0
  func: ^0.1.0
```

Run `pub get` again.


### 2. Add Fela Library and create a style element in your index.html

Locate your index.html and place a `<style>` element with an unique id in your code like so.

:file_folder: `web/index.html`
```html
<html>
<head>
   <script src="https://npmcdn.com/fela@1.1.0/dist/fela.min.js"></script>
   ...
   <style id="felaStyles"></style>
</head>
...
```

Note that id you used because we will need it in next step.

### 3. Create a Renderer Service and JS-Bindings

You should create a `FelaRendererService` in your application which can be **Injected into your Components**. 
As you can see it requires a DOMElement with id *felaStyles* to be present. We created that in the previous step in our `index.html`
 
:file_folder: `lib/fela_renderer_service.dart`

```dart
import 'package:angular2/core.dart';
import 'dart:html';
import 'package:fela_example_angular_2_dart/fela_js_bridge.dart' as Fela;

@Injectable()
class FelaRendererService {
  static Fela.Renderer renderer = null;

  constructor() {
    if (FelaRendererService.renderer == null) {
      FelaRendererService.renderer = Fela.createRenderer();
      Fela.render(renderer, querySelector('#felaStyles'));
    }
  }

  String renderRule(Function rule, Map<String, dynamic> props) {
    return FelaRendererService.renderer.renderRule(rule, props);
  }

}
```

:file_folder: `lib/fela_js_bridge.dart`

```dart
@JS()
library Fela;

import "dart:html";
import "package:func/func.dart";
import "package:js/js.dart";

@anonymous
@JS()
class Renderer {
  external String renderRule(Function rule, Map props);
  external clear();
}

@anonymous
@JS()
external Renderer createRenderer();

@anonymous
@JS()
external render(Renderer renderer, HtmlElement mountNode);

```


### 4. Styling your Component with Fela

:bangbang: WRITE DOC HERE

:file_folder: `lib/app_component.dart`

```dart
import 'package:angular2/core.dart';
import 'package:fela_example_angular_2_dart/fela_renderer_service.dart';
import 'dart:convert';

@Component(
  selector: 'my-app',
  providers: const [ FelaRendererService ],
  template: '<h1 class="{{ headlineClass }}">My First Angular 2 App</h1>')
class AppComponent implements OnInit {
  String headlineClass = '';
  String infoBoxClass = '';

  final FelaRendererService _felaRendererService;
  AppComponent(this._felaRendererService);

  void initFelaStyles() {
    Map rule(Map props) {
      Map styles = new Map();
      styles["fontSize"] = props["fontSize"] + 'px';
      styles["color"] = props["color"] ? props["color"] : 'red';
    };

    headlineClass = _felaRendererService.renderRule(rule, JSON.decode('{ "fontSize": 20 }'));
    infoBoxClass = _felaRendererService.renderRule(rule, JSON.decode('{ "color": "#00ff00" }'));
  }

  void ngOnInit() {
    initFelaStyles();
  }
}
```




