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

  clear() {
    FelaRendererService.renderer.clear();
  }

}
