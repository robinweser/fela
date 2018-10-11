import NavigationView from '../../../components/navigation/NavigationView'
import EmbeddedView from '../../../components/navigation/EmbeddedView'

import {
  P,
  H2,
  H3,
  Ul,
  Li,
  A,
  Info,
  Code,
  B,
  Hr,
  I,
} from '../../../components/styleguide'

export default () => (
  <EmbeddedView>
    <NavigationView title="Renderer">
      <P>
        We have learned about all basic renderable elements which are rules,
        keyframes and fonts. Now we can finally learn how to actually render and
        use them within our application. In order to do so we need a renderer.
      </P>
      <P>
        The renderer is a single object that coordinates the whole rendering
        workflow. It also uses a special caching mechanism to access previously
        rendered styles faster and reduce the amount of DOM manipulations.
      </P>
      <P>
        To create a new renderer, Fela provides the{' '}
        <A href="/docs/api/fela/create-renderer">`createRenderer`</A> API.
        <Code>{`import { createRenderer } from 'fela'

const renderer = createRenderer()
`}</Code>
        We may optionally pass a configuration object as second parameter. Read
        the{' '}
        <A href="/docs/advanced/renderer-configuration">
          Renderer Configuration
        </A>{' '}
        article for further information.
      </P>

      <H2>Rendering Styles</H2>
      <P>
        The renderer provides dedicated render methods for each of the three
        renderable components which we introduced in the previous articles.
        <Ul>
          <Li>
            <A href="/docs/api/fela/renderer#renderrule">renderRule</A>
          </Li>
          <Li>
            <A href="/docs/api/fela/renderer#renderkeyframe">renderKeyframe</A>
          </Li>
          <Li>
            <A href="/docs/api/fela/renderer#renderfont">renderFont</A>
          </Li>
        </Ul>
        <Info>
          <B>Tip</B>: Read the tips and tricks of each render method first.
          Especially the{' '}
          <A href="/docs/api/fela/renderer#renderrule">renderRule</A> tips are
          very helpful for beginners as well as advanced users.
        </Info>
      </P>
      <H3>renderRule</H3>
      <P>
        Takes a <A href="/docs/basics/rules">rule</A> and some `props` to
        resolve the rule. If no `props` are passed it defaults to an empty
        object.
        <br />
        It maps each declaration to unique atomic CSS classes and returns them
        combined.
        <Code>{`import { createRenderer } from 'fela'

const renderer = createRenderer()

const rule = props => ({
  fontSize: props.fontSize,
  backgroundColor: 'blue',
  color: 'red'
})

renderer.renderRule(rule) // => a b
renderer.renderRule(rule, { fontSize: '12px' }) // => a b c
renderer.renderRule(rule, { fontSize: '15px' }) // => a b d`}</Code>
        <Code>{`.a { background-color: blue }
.b { color: red }
.c { font-size: 12px }
.d { font-size: 15px }`}</Code>
      </P>

      <H3>renderKeyframe</H3>
      <P>
        Takes a <A href="/docs/basics/keyframes">keyframe</A> and some `props`
        to resolve the keyframe. If no `props` are passed it defaults to an
        empty object. It returns the rendered animation name. It also adds the
        keyframe with both `@-webkit-` and `@-moz-` prefixes, but we will ignore
        them here for brevity.
        <Code>{`import { createRenderer } from 'fela'

const renderer = createRenderer()

const keyframe = props => ({
  from: { color: 'green' },
  to: { color: props.toColor }
})

renderer.renderKeyframe(keyframe, { toColor: 'red' }) // => k1
renderer.renderKeyframe(keyframe, { toColor: 'blue' }) // => k2`}</Code>
        <Code>{`@keyframes k1 {
  from {
    color: green
  }
  to {
    color: red
  }
}

@keyframes k2 {
  from {
    color: green
  }
  to {
    color: blue
  }
}`}</Code>
      </P>

      <H3>renderFont</H3>
      <P>
        Rendering <A href="/docs/basics/fonts">fonts</A> is a bit different.
        `renderFont` takes the font family and an array of font source files as
        mandatory arguments and an optional object containing additional font
        properties.
        <Code>{`import { createRenderer } from 'fela'

const renderer = createRenderer()

const files = [
  './fonts/Lato.ttf',
  './fonts/Lato.woff'
]

renderer.renderFont('Lato', files)
renderer.renderFont('Lato-Bold', files, { fontWeight: 'bold' })
renderer.renderFont('Lato-Bold-Alias', files, { fontWeight: 'bold', localAlias: ['Lato Bold', 'Lato-Bold'] })`}</Code>
        <Code>{`@font-face {
  font-family: 'Lato';
  src: url('./fonts/Lato.ttf') format(truetype),
       url('./fonts/Lato.woff') format(woff)
}

@font-face {
  font-family: 'Lato-Bold';
  src: url('./fonts/Lato.ttf') format(truetype),
       url('./fonts/Lato.woff') format(woff);
  font-weight: bold
}

@font-face {
  font-family: 'Lato-Bold-Alias';
  src: local('Lato Bold'), 
       local('Lato-Bold'),
       url('./fonts/Lato.ttf') format(truetype),
       url('./fonts/Lato.woff') format(woff);
  font-weight: bold
}`}</Code>
      </P>
      <H2>Avanced API</H2>
      <P>
        Check out the{' '}
        <A href="/docs/api/fela/renderer">API Reference - Renderer</A> to learn
        about all of its methods. This article only describes the basic
        rendering methods. It does not include `clear`, `subscribe` or even
        `renderStatic`.
      </P>

      <Hr />
      <H3>Related</H3>

      <Ul>
        <Li>
          <A href="/docs/advanced/dom-rendering">DOM Rendering</A>
        </Li>
        <Li>
          <A href="/docs/advanced/server-rendering">Server Rendering</A>
        </Li>
        <Li>
          <A href="/docs/advanced/rendering-configuration">
            Rendering Configuration
          </A>
        </Li>

        <Li>
          <A href="/docs/api/fela/renderer">API Reference - Renderer</A>
        </Li>
        <Li>
          <A href="/docs/api/fela/create-renderer">
            API Reference - `createRenderer`
          </A>
        </Li>
      </Ul>
      <br />
      <H3>Tools</H3>
      <P>
        <B>
          <A href="https://github.com/rofrischmann/fela/tree/master/packages/fela-native">
            fela-native
          </A>
        </B>
        <br />
        Renderer for React Native.
      </P>
    </NavigationView>
  </EmbeddedView>
)
