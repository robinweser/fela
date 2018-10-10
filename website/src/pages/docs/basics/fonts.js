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
    <NavigationView title="Fonts">
      <P>
        Another useful feature of CSS are{' '}
        <A href="https://developer.mozilla.org/de/docs/Web/CSS/@font-face">
          `@font-faces`
        </A>
        , which allow you to provide your own fonts.
        <br />
        There are only seven different properties a `@font-face` rule accepts.
      </P>

      <H2>Font Family & Source Files</H2>
      <P>
        The font family specifies a name which is later used to reference the
        font within other rules. The source files are basically relative or
        absolute paths pointing to a valid font file. Both are required to get a
        valid font face rendered. Base64 font files are also supported. Just
        make sure you supply the correct mime type for those.
      </P>
      <H2>Font Properties</H2>
      <P>
        In addition to the required parameters, each font face accepts five
        other properties to customize the font. They all are standard CSS
        properties:
        <Ul>
          <Li>`fontVariant`</Li>
          <Li>`fontStretch`</Li>
          <Li>`fontWeight`</Li>
          <Li>`fontStyle`</Li>
          <Li>`unicodeRange`</Li>
        </Ul>
      </P>
      <Hr />
      <H3>Related</H3>

      <Ul>
        <Li>
          <A href="/docs/basics/renderer#renderfont">Renering Fonts</A>
        </Li>
        <Li>
          <A href="/docs/api/fela/createRenderer#renderfont">
            API Reference - `Renderer.renderFont`
          </A>
        </Li>
        <Li>
          <A href="https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-embedded">
            Plugin - fela-plugin-embedded
          </A>
        </Li>
      </Ul>
    </NavigationView>
  </EmbeddedView>
)
