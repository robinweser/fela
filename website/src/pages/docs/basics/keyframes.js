import NavigationView from '../../../components/navigation/NavigationView'
import EmbeddedView from '../../../components/navigation/EmbeddedView'

import {
  P,
  H2,
  H3,
  Ul,
  Li,
  A,
  Code,
  B,
  Hr,
  I,
} from '../../../components/styleguide'

export default () => (
  <EmbeddedView>
    <NavigationView title="Keyframes">
      <P>
        As the name already suggests, keyframes are used to render{' '}
        <A href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations">
          CSS animation keyframes
        </A>
        .
      </P>
      <P>
        Keyframes are very similar to rules, in that they are also defined as
        functions of `props` and return objects, but the returned objects have a
        slightly different shape.
      </P>

      <H2>Keyframe Object</H2>
      <P>
        The objects returned by keyframes are called <I>keyframe objects</I> if
        they conform a special shape.
        <br />
        Each key in the object must be either a percentage value or the keywords
        `from` or `to`, which are equivalent to `0%` and `100%`. Those keys
        again need to reference objects containing all style declarations that
        should be animated. The nested objects have to conform to a{' '}
        <A href="/docs/basics/rules">rule</A>
        's <A href="/docs/basics/rules#basicshape">basic shape</A>.
        <Code>{`const keyframe = props => ({
  '0%': { color: 'black' },
  '33%': { color: props.firstColor },
  '66%': { color: props.secondColor },
  '100%': { color: 'black' }
})`}</Code>
      </P>
      <Hr />
      <H3>Related</H3>

      <Ul>
        <Li>
          <A href="/docs/basics/renderer#renderkeyframe">Renering Keyframes</A>
        </Li>
        <Li>
          <A href="/docs/api/fela/createRenderer#renderkeyframe">
            API Reference - `Renderer.renderKeyframe`
          </A>
        </Li>
      </Ul>
      <br />
      <H3>Tools</H3>
      <P>
        <B>
          <A href="https://github.com/FormidableLabs/react-animations">
            FormidableLabs/react-animations
          </A>
        </B>
        <br />
        CSS animations to be used with CSS in JS solutions.
      </P>
    </NavigationView>
  </EmbeddedView>
)
