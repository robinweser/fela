import NavigationView from '../../../components/navigation/NavigationView'
import EmbeddedView from '../../../components/navigation/EmbeddedView'

import { P, H3, B, A, Info, Quote, Code } from '../../../components/styleguide'

export default () => (
  <EmbeddedView>
    <NavigationView title="Principles">
      <H3>1. Styles are pure functions of your application state</H3>

      <Info>
        Read{' '}
        <A href="https://medium.com/@rofrischmann/styles-as-functions-of-state-1885627a63f7#.6k6i4kdch">
          Style as a Function of State
        </A>{' '}
        for more information on this principle.
      </Info>

      <P>
        Modern UI libraries such as{' '}
        <A href="https://facebook.github.io/react/">React</A> provide neat APIs
        to implement the very basic concept of component-based views.{' '}
        <A href="https://github.com/leebyron">Lee Byron</A> used to describe
        components, during his{' '}
        <A href="https://vimeo.com/166790294">Render 2016</A> presentation, as
        the following:
      </P>
      <Quote author="Lee Byron">
        "The current state of things goes in and a representation of what you
        want on the screen comes out."
      </Quote>
      <Code>{'(state) => view'}</Code>

      <P>
        This simple concept allows us to compose multiple components into a
        complex and dynamic UI while always keeping what is displayed in sync
        with our application state.
      </P>

      <P>
        Yet a component does not only describe <B>which</B> information is
        displayed, but also <B>how</B> it is displayed. In general we use CSS to
        style our components by creating static selectors that again define a
        fixed set of style declarations. This approach totally works fine as
        long as you have a static UI which only updates its displayed data, but
        does not suit a dynamic UI which alters its appearance depending on data
        it receives.
      </P>

      <P>
        <B>If the view is a function of state, your CSS should be too</B>, as it
        is part of your view.
        <Code>{'(state) => style'}</Code>
      </P>

      <P>
        Your styles are not just a static style declarations anymore. They can
        automatically adjust themselves to fit the displayed information at any
        point of time.
      </P>

      <P>
        We call the relevant parts of the state properties, usually referred to
        as <B>props</B>.
        <Code>
          {`const rule = props => ({
  fontSize: props.size + 'px',
  color: 'blue',
  lineHeight: props.lineHeight,
  display: 'flex'
})`}
        </Code>
      </P>
    </NavigationView>
  </EmbeddedView>
)
