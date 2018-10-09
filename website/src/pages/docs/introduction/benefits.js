import NavigationView from '../../../components/navigation/NavigationView'
import EmbeddedView from '../../../components/navigation/EmbeddedView'

import { P, H3,  A } from '../../../components/styleguide'

export default () => (
  <EmbeddedView>
    <NavigationView title="Benefits">
      <H3>1. Universal Rendering</H3>
      <P>
        Fela was designed to be capable of universal rendering (client- and
        server-side rendering) from the very beginning. The renderer, which is
        the core of Fela, ships with universal rendering capabilities that can
        be utilized by both the DOM renderer and the server renderer to ship a
        seamless universal rendering experience.
      </P>

      <H3>2. Local Namespace</H3>
      <P>
        Each rule is transformed into unique CSS classes by design. Hence there
        is no chance of any conflicts due to the global namespace.
      </P>

      <H3>3. Dead Code Elimination</H3>
      <P>
        Fela only adds styles to the markup that have actively been rendered.
        Unused style declarations are left out by default.
      </P>

      <H3>4. Framework-agnostic</H3>
      <P>
        In contrast to many other JavaScript-based styling solutions, Fela is
        not tied to any framework or library. It has been designed with{' '}
        <A href="https://facebook.github.io/react/">React</A> in mind, but can
        be used as a stand-alone solution or with any other framework. We do
        provide{' '}
        <A href="https://github.com/rofrischmann/fela/tree/master/packages/react-fela">
          bindings
        </A>{' '}
        for React though.
      </P>

      <H3>5. Minimal Markup Size</H3>
      <P>
        Fela uses atomic class design to enable minimal markup size. That means,
        every single declaration e.g. `color: red` is transformed into a unique
        CSS class. This enables modular style reuse on declaration basis. In
        general, the more styles are rendered, the more duplicate declarations
        it contains.
      </P>

      <H3>6. High Performance</H3>
      <P>
        Atomic class design also enables super fast rendering. Rendered
        declarations get cached and can therefore be reused immediately.
        Additionally, there are several performance benefits by rendering styles
        with JavaScript. First of all, CSS is only generated and attached as it
        is needed. Also, it uses single class selectors which are among the
        fastest CSS selectors available.
      </P>
      <P>
        Check the{' '}
        <A href="https://github.com/hellofresh/css-in-js-perf-tests#results">
          css-in-js-perf-tests
        </A>
        repository for benchmark results. Also check out{' '}
        <A href="https://tuchk4.github.io/css-in-js-app/#/react-fela">
          css-in-js-app
        </A>{' '}
        for DOM rendering benchmark and comparison.
      </P>

      <H3>7. No Global State</H3>
      <P>
        Contrary to many other JavaScript styling solutions, Fela does not use
        any global state. All the magic happens only inside the renderer
        instance.
      </P>
    </NavigationView>
  </EmbeddedView>
)
