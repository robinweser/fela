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
