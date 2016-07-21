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
